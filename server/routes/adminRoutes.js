const express = require("express");
const { verifyToken, verifyAdminToken } = require("../helpers/authJwt");
const { login, adminDashboard } = require("../controllers/adminController");

const router = express.Router();

router.post("/login", login);
router.get("/", verifyAdminToken, adminDashboard);
module.exports = router;
