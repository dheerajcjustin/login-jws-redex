import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginStatus } from "../config/redux";
import axios from "../config/axios";

export const Home = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      console.log("user does not exited");
      navigate("/login");
    } else {
      axios
        .get("/user/secret", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            console.log("hai response is true");
            dispatch(changeLoginStatus(true));
          } else {
            navigate("/login");

            dispatch(changeLoginStatus(false));
          }
        });
    }
  }, [loginStatus]);

  return (
    <div className="text-center">
      <h1>Home</h1>
      <h1>login status is </h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/secret">secret</Link>

      {/* <h1> {value}</h1> */}
    </div>
  );
};
