const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
} = require("../controller/BookController");

const router = express.Router();

router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
