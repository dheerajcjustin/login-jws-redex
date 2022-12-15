const express = require("express");
const { verifyToken, verifyAdminToken } = require("../helpers/authJwt");
const {
  login,
  adminDashboard,
  userEdit,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", login);
router.get("/", verifyAdminToken, adminDashboard);
router.post("/edit", verifyAdminToken, userEdit);
module.exports = router;
