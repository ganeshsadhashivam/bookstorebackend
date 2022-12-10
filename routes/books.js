const router = require("express").Router();
const Books = require("../models/books.modal");

router.route("/").get((req, res) => {
  Books.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

//PUT request

router.route("/add").put((req, res) => {
  const name = req.body.name;
  const author = req.body.author;
  const genre = req.body.genre;
  const dateOfRelease = Date.parse(req.body.dateOfRelease);
  const bookImage = req.body.bookImage;
  const rating = Number(req.body.rating);
  const price = Number(req.body.price);

  const newBooks = new Books({
    name,
    author,
    genre,
    dateOfRelease,
    bookImage,
    rating,
    price,
  });

  newBooks
    .save()
    .then(() => res.json("Books added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Books.findById(req.params.id)
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Books.findByIdAndDelete(req.params.id)
    .then(() => res.json("Books deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  Books.findById(req.params.id)
    .then((books) => {
      books.name = req.body.name;
      books.author = req.body.author;
      books.genre = req.body.genre;
      books.dateOfRelease = Date.parse(req.body.dateOfRelease);
      books.bookImage = req.body.bookImage;
      books.rating = Number(req.body.rating);
      books.price = Number(req.body.price);

      books
        .save()
        .then(() => res.json("Books updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
