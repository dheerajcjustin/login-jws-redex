const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
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
      return next();
    }
  });
};

const verifyAdminToken = (req, res, next) => {
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
    } else if (decode) {
      console.log(decode);
      if (decode.userType != "admin") {
        res.json({
          login: false,
          massage: "you are not authenticated",
        });
      } else {
        return next();
      }
      }
  });
};

exports.verifyAdminToken = verifyAdminToken;
exports.verifyToken = verifyToken;
