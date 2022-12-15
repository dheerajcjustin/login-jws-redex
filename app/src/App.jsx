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
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "../src/pages/Home";
import { Login } from "../src/pages/Login";
import { Signup } from "../src/pages/Signup";
import { Secret } from "../src/pages/Secret";
import { Profile } from "../src/pages/Profile";
import { AdminHome } from "../src/pages/AdminHome";
import { AdminLogin } from "../src/pages/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
    } else {
      axios
        .get("/user/secret", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status) {
            dispatch(changeLoginStatus(true));
          }
        });
    }
  }, []);

  return (
    <Router>
      <div className=" w-screen h-screen  bg-red-300 -center ">
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <AdminNavbar /> <AdminHome />
              </>
            }
          />
          <Route
            path="/admin/login"
            element={
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />{" "}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />{" "}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar /> <Signup />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar /> <Profile />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
