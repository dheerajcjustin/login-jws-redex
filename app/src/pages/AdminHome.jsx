import { useEffect, useState } from "react";
import React from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { changeUserType } from "../config/redux";
import { useSelector, useDispatch } from "react-redux";

export const AdminHome = () => {
  const adminLogged = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      console.log("admin does not exited");
      navigate("/admin/login");
    } else {
      axios
        .get("/admin", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status) {
            console.log("hai response is true");
            dispatch(changeUserType(true));
            setUserList(response.data.users);
          } else {
            navigate("/admin/login");

            dispatch(changeUserType(false));
          }
        });
    }
  }, [adminLogged]);

  return (
    <div className="container px-36">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      username
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      edit
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList &&
                    userList.map((user, index) => {
                      return (
                        <tr className="border-b" key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                            <button className="bg-emerald-600 py-2 px-3 rounded-lg">
                              edit
                            </button>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button className="bg-red-400 py-2 px-3 rounded-lg">
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
