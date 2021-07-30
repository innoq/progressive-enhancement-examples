const express = require("express");
const methodOverride = require("method-override");
const uuid = require("uuid").v4;
const app = express();
const port = 3000

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({
	extended: true
}));
app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === "object" && "_method" in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method;
	}
}));

// COMPLAINTS

let complaints = [{
	id: "1",
	message: "The water was too cold."
}, {
	id: "2",
	message: "My nose is too itchy."
}, {
	id: "3",
	message: "The weather is too rainy"
}];

function findComplaint (req) {
	let index = req.params.complaintId;
	return complaints.find(c => c.id === index);
}

app.get("/", (req, res) => {
	res.render("complaints/index", { complaints });
});

app.post("/complaints/", (req, res) => {
	if (req.body.message) {
		complaints.push({
			id: uuid(),
			message: req.body.message
		});
		res.redirect("/");
	} else {
		res.status(400).send("Need to fill out form!");
	}
})

app.get("/complaints/:complaintId", (req, res) => {
	let complaint = findComplaint(req);

	if (complaint) {
		res.render("complaints/show", { ...complaint });
	} else {
		res.status(404).send("Complaint not found!")
	}
});

app.put("/complaints/:complaintId", (req, res) => {
	switch (req.body.action) {
		case "custom":
			custom(req, res);
			break;
		case "choose":
			choose(req, res);
			break;
		case "reimburse":
			reimburse(req, res);
			break;
		default:
			res.status(404).send("Please tell me what your response to the complaint is!");
	}
});

app.get("/complaints/:complaintId/wizard", (req, res) => {
	let complaint = findComplaint(req);

	switch (req.query.action) {
		case "custom":
			res.render("complaints/wizard/custom", { ...complaint });
			break;
		case "choose":
			res.render("complaints/wizard/choose", { ...complaint });
			break;
		case "reimburse":
			res.render("complaints/wizard/payment", { ...complaint, payments });
			break;
		default:
			res.status(404).send("Action not found!");
	}
})

function custom (req, res) {
	let complaint = findComplaint(req);

	complaint.status = "Custom Apology sent";
	complaint.response = req.body.apology;

	res.redirect("/");
}

function choose (req, res) {
	let complaint = findComplaint(req);

	complaint.status = "Default Response sent";
	complaint.response = req.body.response;

	res.redirect("/");
}

function reimburse (req, res) {
	let complaint = findComplaint(req);

	complaint.status = "Reimbursed";
	complaint.response = "Your complaint has been investigated by us and the money has been reimbursed"
	complaint.paymentId = req.body.payment;

	res.redirect("/");
}

// PAYMENTS

let payments = [{
	id: "1",
	receiver: "John Smith",
	type: "IBAN",
	value: "DE12 3456 7890 1234 5678 90"
}, {
	id: "2",
	receiver: "Bob Smiley",
	type: "Credit Card",
	value: "1234 5678 9012 3456",
	cvc: "789",
	expiryMonth: 10,
	expiryYear: 22
}];

function findPayment (req) {
	let index = req.params.paymentId;
	return payments.find(p => p.id === index);
}

app.get("/payments", (req, res) => {
	res.render("payments/index", { payments });
});

app.get("/payments/new", (req, res) => {
	res.render("payments/new");
});

app.post("/payments/", (req, res) => {
	let id = uuid();
	let origin = req.body.origin;

	payments.push({
		id: id,
		incomplete: true
	});

	res.redirect(`/payments/${id}/receiver${origin ? `?origin=${encodeURI(origin)}` : ''}`);
});

app.get("/payments/:paymentId", (req, res) => {
	let payment = findPayment(req);

	res.render("payments/show", { ...payment });
});

app.get("/payments/:paymentId/receiver", (req, res) => {
	let payment = findPayment(req);

	res.render("payments/receiver-info", { ...payment, origin: req.query.origin });
});

app.get("/payments/:paymentId/payment", (req, res) => {
	let payment = findPayment(req);

	res.render("payments/payment-info", { ...payment, origin: req.query.origin });
});

app.patch("/payments/:paymentId", (req, res) => {
	let payment = findPayment(req);
	let origin = req.body.origin;

	if (req.body.receiver) {
		payment.receiver = req.body.receiver;
		payment.type = req.body.type;

		res.redirect(`/payments/${payment.id}/payment${origin ? `?origin=${encodeURI(origin)}` : ''}`);
		return;
	}

	if (payment.type === "IBAN") {
		payment.iban = req.body.iban;
	}

	if (payment.type === "Credit Card") {
		payment.cardnr = req.body.cardnr;
		payment.expiryMonth = req.body.expiryMonth;
		payment.expiryYear = req.body.expiryYear;
		payment.cvc = req.body.cvc;
	}

	payments.incomplete = false;

	res.redirect(origin || "/payments/");
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});
