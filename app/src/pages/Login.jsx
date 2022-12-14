import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { changeLoginStatus } from "../config/redux";
import { useSelector, useDispatch } from "react-redux";

export const Login = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [LoginStatus, setLoginStatus] = useState(true);
  const valueSetting = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/user/login", userData);
    if (!response.data.status) {
      setLoginStatus(false);
    } else {
      console.log(response.data.accessToken);
      localStorage.setItem("user", response.data.accessToken);
      setLoginStatus(true);
      dispatch(changeLoginStatus(true));
      navigate("/ ");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <Link to="/">Home</Link>

      <form
        className="max-w-[500px] w-full mx-auto bg-gray-900  p-8 px-10 rounded-lg"
        onSubmit={loginSubmit}
      >
        <h2 className="text-4xl text-white text-center font-bold mb-7">
          Login
        </h2>
        <div className="flex flex-col text-gray-100">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none"
            value={userData.email}
            type="text"
            name="email"
            id="email"
            onChange={valueSetting}
          />
        </div>
        <div className="flex flex-col text-gray-100">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none"
            value={userData.password}
            type="text"
            name="password"
            id="password"
            onChange={valueSetting}
          />
        </div>
        {!LoginStatus && (
          <p className="text-red-300">invalid username or password</p>
        )}
        <div className=" text-right text-gray-400 py-2">
          <p className="cursor-pointer underline">Forgot password</p>
        </div>
        <div className="text-center">
          <button className="w-96 my-5 bg-emerald-500 py-3 rounded-lg shadow-lg shadow-emerald-500/50  hover:w-full transition-all text-xl font-semibold">
            Login
          </button>
        </div>
      </form>
    </>
  );
};
