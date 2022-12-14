// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainRoutes } from "./components/MainRoutes";
import Navbar from "./components/Navbar";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./config/redux";
import axios from "../src/config/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginStatus } from "../src/config/redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      console.log("user does not exited");
    } else {
      console.log(token);
      axios
        .get("/user/secret", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            console.log("hai response is true");
            dispatch(changeLoginStatus(true));
          }
        });
    }
  }, []);

  return (
    <div className=" w-screen h-screen  bg-red-300 -center ">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
