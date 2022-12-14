const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");

const signupWithEmail = async (req, res) => {
  console.log("🚀 ~ file: Usersignup.js:7 ~ signup ~ req.body", req.body);
  const userExits = await User.findOne({ email: req.body.email });
  console.log(userExits);
  if (userExits) {
    res.json({ status: false, message: "Email already exits" });
  } else {
    const user = new User(req.body);

    try {
      await user.save();
      res.json({ status: true });
    } catch (error) {
      console.log(error);
      res.json({ status: false, message: "network error" });
    }
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const userCheck = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (userCheck) {
    const user = {
      email: userCheck.email,
      userId: userCheck._id.toString(),
    };
    console.log(user);
    const accessToken = await JWT.sign(user, "paratuladapatti", {
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

const userVerify = (req, res) => {
  console.log("req headers", req.headers.authorization);
  let auth = req.headers.authorization;
  if (!auth) {
    res.json({
      error: "no token provided",
    });
  } else {
    auth = auth.split(" ").pop();
    console.log(auth);
  }

  const verifyToken = JWT.verify(auth, "paratuladapatti", (err, decode) => {
    if (err) {
      console.log("failed invalid token");
      res.json({
        login: false,
        message: "invalid token",
      });
    } else {
      console.log(decode);
      req.user = decode;
      console.log("req.user is ", req.user);
      res.json({
        login: true,
        message: "invalid token",
      });
    }
  });
};

exports.secret = secret;

exports.login = login;
exports.signupWithEmail = signupWithEmail;
