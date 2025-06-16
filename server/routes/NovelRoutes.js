const express = require("express");
const {
  createAuthor,
  createNovel,
  getNovelWithAuthor,
} = require("../controller/NovelController");

const router = express.Router();

router.post("/author", createAuthor);
router.post("/novel", createNovel);
router.get("/novel/:id", getNovelWithAuthor);

module.exports = router;
