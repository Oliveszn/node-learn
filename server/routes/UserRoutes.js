const express = require("express");

//controller func
const {
  registerUser,
  loginUser,
  logout,
  authMiddleware,
  changePassword,
} = require("../controller/UserController");

const router = express.Router();

// signup route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// logout route
router.post("/logout", logout);

router.post("/change", authMiddleware, changePassword);

// middleware route
router.get("/checkAuth", authMiddleware, (req, res) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  }
  res.status(200).json({
    success: false,
    message: "No user authenticated",
  });
});

module.exports = router;
