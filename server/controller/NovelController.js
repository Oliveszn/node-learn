const Author = require("../models/Author");
const Novel = require("../models/Novels");

const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();

    res.status(201).json({
      success: true,
      data: author,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const createNovel = async (req, res) => {
  try {
    const novel = new Novel(req.body);
    await novel.save();

    res.status(201).json({
      success: true,
      data: novel,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getNovelWithAuthor = async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id).populate("author");

    if (!novel) {
      return res.status(404).json({
        success: false,
        message: "Novel not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: novel,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { createAuthor, createNovel, getNovelWithAuthor };
