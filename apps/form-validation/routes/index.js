var express = require("express");
var router = express.Router();
var ISBN = require("./isbn");

let books = [{
	title: "CSS Secrets: Typische Webdesign-Probleme klug gelöst",
	author: "Lea Verou",
	price: 27.99,
	discount: 25,
	isbn: "978-3960090250",
	rating: 4.3,
}, {
	title: "Inclusive Design Patterns",
	author: "Heydon Pickering",
	price: 9.26,
	isbn: "‎‎978-3945749432",
	rating: 4.5
}];

let formatter = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR"
});

function formatNumber(number) {
	return number.toLocaleString("de-DE");
}

function viewModelBooks() {
	return books.map(book => {
		if (book.discount) {
			book.discountedPrice = formatter.format(book.price - (book.price * book.discount / 100));
		}

		book.formattedRating = formatNumber(book.rating);
		book.formattedPrice = formatter.format(book.price);

		return book;
	});
}

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { books: viewModelBooks(), fields: defaultFields });
});

function requiredFieldValidator(field) {
	if (!field) {
		return "Bitte füllen Sie dieses Feld aus!"
	}
}

function priceValidator(field) {
	let requiredMsg = requiredFieldValidator(field);

	if (requiredMsg) {
		return requiredMsg;
	}

	let number = Number(field)
	if (!number || number < 0.01) {
		return "Bitte geben sie einen positiven Betrag an";
	}
}

function discountValidator(field) {
	if (!field) {
		return;
	}

	let number = Number(field)
	if (number === NaN || number < 0 || number > 100) {
		return "Bitte geben Sie einen gültigen Prozentwert an";
	}
}

function isbnValidator(field) {
	let requiredMsg = requiredFieldValidator(field);

	if (requiredMsg) {
		return requiredMsg;
	}

	if (!ISBN.isValidIsbn(field)) {
		return "Bitte geben Sie eine gültige ISBN an!";
	}
}

let fieldSpecs = [{
	name: "title",
	validator: requiredFieldValidator
}, {
	name: "author",
	validator: requiredFieldValidator
}, {
	name: "price",
	validator: priceValidator
}, {
	name: "discount",
	validator: discountValidator
}, {
	name: "isbn",
	validator: isbnValidator
}]

let defaultFields = {};
fieldSpecs.forEach(spec => {
	defaultFields[spec.name] = {};
});

function verifyFields(form = {}) {
	let fields = {};
	fieldSpecs.forEach(spec => {
		let value = form[spec.name];
		fields[spec.name] = { value };

		if (spec.validator) {
			fields[spec.name].error = spec.validator(value);
		}
	});

	return fields;
}

function hasErrors(fields) {
	let hasErrors = false;
	fieldSpecs.forEach(spec => {
		if (fields[spec.name].error) {
			hasErrors = true;
		}
	});
	return hasErrors;
}

/* GET validate book parameters. */
router.get("/validate-book", function(req, res, next) {
	let fields = verifyFields(req.query);
	res.render("index", { books: viewModelBooks(), fields, hasErrors: hasErrors(fields) });
});

/* POST new book. */
router.post("/", function(req, res, next) {
	let errors = {};

	if (errors !== {}) {
		let fields = verifyFields(req.body);
		res.render("index", { books: viewModelBooks(), fields, hasErrors: hasErrors(fields) });
	} else {
		res.redirect("/");
	}
});

module.exports = router;
