const express = require("express");
const {
  signupWithEmail,
  login,
  secret,
  viewProfile,
  uploadImage,
} = require("../controllers/userController");
const { verifyToken } = require("../helpers/authJwt");
const router = express.Router();

router.post("/signupByEmail", signupWithEmail);
router.post("/login", login);
router.get("/secret", verifyToken, secret);
router.get("/profile", verifyToken, viewProfile);
router.post("/uploadImage", verifyToken, uploadImage);

module.exports = router;
