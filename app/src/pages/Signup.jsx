import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../config/axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    name: {
      value: true,
      message: "",
    },
    email: {
      value: true,
      message: "",
    },
    password: {
      value: true,
      message: "",
    },
  });
  const valueSetting = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const nameCheck = () => {
    if (userData.name.length < 2) {
      setValidation((prevState) => ({
        ...prevState,
        name: {
          value: false,
          message: "name must be more than 2 character",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        name: {
          value: true,
          message: "",
        },
      }));
    }
  };
  const emailCheck = () => {
    if (userData.email.length < 2) {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: false,
          message: "is this really your email ?",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          value: true,
          message: "",
        },
      }));
    }
  };
  const passwordCheck = () => {
    if (userData.password.length < 8) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: false,
          message: "password  must be more than 8 character",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          value: true,
          message: "",
        },
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    passwordCheck();
    emailCheck();
    nameCheck();
    if (
      validation.email.value == true &&
      validation.name.value == true &&
      validation.password.value == true
    ) {
      try {
        const response = await axios.post("/user/signupByEmail", userData);
        if (!response.data.status) {
          setValidation((prevState) => ({
            ...prevState,
            email: {
              value: false,
              message: "Email already exist",
            },
          }));
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Link to="/">Home</Link>

      <form
        className="max-w-[500px] w-full mx-auto bg-gray-900  p-8 px-10 rounded-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-4xl text-white text-center font-bold mb-7">
          Sign up
        </h2>
        <div className="flex flex-col text-gray-100">
          <label htmlFor="name">Name</label>

          <input
            className={`
             ${!validation.name.value ? " border-red-400 border-2 " : ""}
              " rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none   " 
             
            `}
            value={userData.name}
            type="text"
            name="name"
            id="name"
            onChange={valueSetting}
            onBlur={nameCheck}
          />
          {!validation.name.value && (
            <p className="text-red-300">{validation.name.message}</p>
          )}
        </div>
        <div className="flex flex-col text-gray-100">
          <label htmlFor="email">Email</label>
          <input
            className={`
            ${!validation.email.value ? " border-red-400 border-2 " : ""}
             " rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none   " 
            
           `}
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={valueSetting}
            onBlur={emailCheck}
          />
          {!validation.email.value && (
            <p className="text-red-300">{validation.email.message}</p>
          )}
        </div>
        <div className="flex flex-col text-gray-100">
          <label htmlFor="password">Password</label>
          <input
            className={`
            ${!validation.password.value ? " border-red-400 border-2 " : ""}
             " rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none   " 
            
           `}
            type="text"
            name="password"
            id="password"
            value={userData.password}
            onChange={valueSetting}
            onBlur={passwordCheck}
          />
          {!validation.password.value && (
            <p className="text-red-300">{validation.password.message}</p>
          )}
        </div>
        <div className=" text-right text-gray-400 py-2">
          <p className="cursor-pointer underline">Forgot password</p>
        </div>
        <div className="text-center">
          <button className="w-96 my-5 bg-emerald-500 py-3 rounded-lg shadow-lg shadow-emerald-500/50  hover:w-full transition-all text-xl font-semibold">
            Signup
          </button>
        </div>
      </form>
    </>
  );
};
