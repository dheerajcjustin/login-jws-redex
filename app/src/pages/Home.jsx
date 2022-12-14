import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTesting } from "../config/redux";

export const Home = () => {
  const value = useSelector((state) => state.value);
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(changeTesting({ name: "wowo ", posa: "tata" }));
  }, 4000);
  // const getAllPrivatePosts = () => {
  //   // setAuthHeader().then((response) => {
  //   //   console.log("trss ", response);
  //   // });
  //   return axios.get("/user/secret", {
  //     headers: { Authorization: `Bearer ${setAuthHeader()}` },
  //   });
  //   // return axios.get("/user/secret");
  // };
  // const [value, setValue] = useState("");
  // useEffect(() => {
  //   getAllPrivatePosts().then((response) => {
  //     console.log(response.data.secret);
  //     setValue(response.data.secret);
  //   });
  // }, []);

  return (
    <div className="text-center">
      <h1>Home</h1>
      <h1>login status is {value} </h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/secret">secret</Link>

      {/* <h1> {value}</h1> */}
    </div>
  );
};
