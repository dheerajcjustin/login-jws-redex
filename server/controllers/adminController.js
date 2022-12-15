const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const login = async (req, res) => {
  console.log(req.body);

  if (req.body.email == "admin@gmail.com" && req.body.password == "qazwsxedc") {
    const admin = {
      email: "admin@gmail.com",
      userType: "admin",
    };
    console.log(admin);
    const accessToken = await JWT.sign(admin, "paratuladapatti", {
      expiresIn: 360000,
    });
    res.json({
      status: true,
      accessToken,
    });
  } else {
    res.json({ status: false });
  }
};

const secret = (req, res) => {
  if (!req.user) {
    res.json({
      status: false,
      massage: "user dose not exits",
    });
  } else {
    res.json({
      status: true,
      massage: "dont tell this to anyone ",
    });
  }
};

const adminDashboard = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({
    status: true,
    users,
  });
};

const userEdit = async (req, res) => {
  console.log("req.body of edit is ", req.body);
  await User.findByIdAndUpdate(req.body.userId, {
    $set: { name: req.body.name, email: req.body.email },
  });
  res.json({ status: true });
};
exports.userEdit = userEdit;
exports.adminDashboard = adminDashboard;
exports.login = login;
