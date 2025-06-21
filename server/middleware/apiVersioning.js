const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "Api version not supported",
    });
  }
};

module.exports = urlVersioning;
