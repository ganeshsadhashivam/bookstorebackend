const Router = require("express");
const param = require("express-validator");
const body = require("express-validator");
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

BooksRouter.put("/:id", async (request, response, next) => {
  const book = await Books.findById(request.params.id);

  if (!book) {
    return response.status(404).json({ error: "book not found" });
  }

  book.name = request.body.name;
  book.author = request.body.author;
  book.genre = request.body.genre;
  book.dateOfRelease = new Date().getTime();
  book.bookImage = request.body.bookImage;
  book.rating = request.body.rating;
  book.price = request.body.price;

  const savedProduct = await book.save();
  console.log(savedProduct);
  response.json(savedProduct);
});

module.exports = BooksRouter;
