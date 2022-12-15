import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import setAuthHeader from "../utilities/setAuthHeader";
import axios from "../config/axios";

export const Secret = () => {
  const logout = () => {
    localStorage.removeItem("user");
  };
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
