const Router = require("express");
const Books = require("../models/books.modal");

const BooksRouter = Router();

const mongoose = require("mongoose");

//GET Request
BooksRouter.route("/").get((req, res) => {
  Books.find()
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(404).json("Error: " + err));
});

//PUT request for add

BooksRouter.route("/add").post((req, res) => {
  const { name, author, genre, dateOfRelease, bookImage, rating, price } =
    req.body;
  if (
    !name ||
    !author ||
    !genre ||
    !dateOfRelease ||
    !bookImage ||
    !rating ||
    !price
  ) {
    return res.status(400).json({
      message:
        "name,author,genre, dateOfRelease,bookImage,and rating ,Price is required",
    });
  } else {
  }
  // const name = req.body.name;
  // const author = req.body.author;
  // const genre = req.body.genre;
  // const dateOfRelease = Date.parse(req.body.dateOfRelease);
  // const bookImage = req.body.bookImage;
  // const rating = Number(req.body.rating);
  // const price = Number(req.body.price);

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
    .then(() => res.status(201).json(newBooks))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET using id

// BooksRouter.get("/:id", async (req, res) => {
//   Books.findById(req.params.id)
//     .then((books) => res.json(books))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//Get using id
BooksRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Books.findById(id);

    if (!product) res.status(404).json({ message: "Product does Not Found" });
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});
//Delete

// BooksRouter.route("/:id").delete((req, res) => {
//   Books.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Books deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//delete
BooksRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Books.findByIdAndDelete(id);
    console.log(product);
    if (!product) res.status(404).json({ message: "Product does Not Found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});

//PUT update
// BooksRouter.route("/update/:id").put((req, res) => {
//   Books.findById(req.params.id)
//     .then((books) => {
//       books.name = req.body.name;
//       books.author = req.body.author;
//       books.genre = req.body.genre;
//       books.dateOfRelease = Date.parse(req.body.dateOfRelease);
//       books.bookImage = req.body.bookImage;
//       books.rating = Number(req.body.rating);
//       books.price = Number(req.body.price);

//       books
//         .save()
//         .then(() => res.json("Books updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

//put for book
BooksRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    console.log(updates);
    const options = { new: true };
    const result = await Books.findByIdAndUpdate(id, updates, options);

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});

module.exports = BooksRouter;
