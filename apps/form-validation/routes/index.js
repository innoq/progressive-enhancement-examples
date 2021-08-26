var express = require("express");
var router = express.Router();

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
	res.render("index", { books: viewModelBooks(), errors: {} });
});

let requiredFields = ["title", "author", "price", "isbn"];

/* POST new book. */
router.post("/", function(req, res, next) {
  let errors = {};

  requiredFields.forEach(field => {
    if (!req.body[field]) {
      errors[field] = "Please fill out this field!";
    }

    console.log(field, req.body[field]);
  });

  if (errors !== {}) {
    res.render("index", { books: viewModelBooks(), errors });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
