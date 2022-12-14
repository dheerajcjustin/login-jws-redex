const express = require("express");
const { signupWithEmail, login, secret } = require("../controllers/userSignup");
const { verifyToken } = require("../helpers/authJwt");
const router = express.Router();

router.post("/signupByEmail", signupWithEmail);
router.post("/login", login);
router.get("/secret", verifyToken, secret);

module.exports = router;
