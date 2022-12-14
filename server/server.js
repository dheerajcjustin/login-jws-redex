const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const port = 5000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/user", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/react_aminlogin")
  .then(() => {
    console.log("mongoose connceta ayye ketto");
  })
  .catch((err) => {
    console.log("mongoose entho sean unde");
  });

server.listen(port, () => {
  console.log(`server srt ayye on port 💖 ${port}  🌹`);
});
