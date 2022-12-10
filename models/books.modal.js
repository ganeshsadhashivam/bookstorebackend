const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    dateOfRelease: { type: Date, required: true },
    bookImage: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
