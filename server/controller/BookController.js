const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks.length > 0) {
      res.status(200).json({
        success: true,
        message: "list of books",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Books",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);

    if (!bookDetailsById) {
      res.status(404).json({
        success: false,
        message: "No Books",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book Details",
        data: bookDetailsById,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = req.body;
    const newlyCreatedBook = await Book.create(newBook);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBookFormData = req.body;
    const getCurrentBookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookId,
      updatedBookFormData,
      {
        new: true,
      }
    );

    if (!updatedBook)
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(getCurrentBookId);

    if (!deleteBook)
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });

    res.status(200).json({
      success: true,
      message: "Book delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
