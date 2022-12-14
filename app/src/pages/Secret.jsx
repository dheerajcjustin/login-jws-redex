import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import setAuthHeader from "../utilities/setAuthHeader";
import axios from "../config/axios";

export const Secret = () => {
  const logout = () => {
    console.log("logging out");
    localStorage.removeItem("user");
  };
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
            setSecret(response.data.massage);
          }
        });
    }
  }, []);

  const [secret, setSecret] = useState("");

  return (
    <div className="text-center">
      <h1 className="text-4xl">screate page</h1>
      <h3 className="text-xs">{secret}</h3>
      <button onClick={logout}>logout</button>

      {/* <h1> {value}</h1> */}
    </div>
  );
};
