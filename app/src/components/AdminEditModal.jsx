import React, { useState } from "react";
import axios from "../config/axios";

export const AdminEditModal = (props) => {
  const [user, setUser] = useState({
    name: props.user.name,
    email: props.user.email,
  });

  const valueSetting = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editSave = async () => {
    console.log(user);
    const token = localStorage.getItem("admin");
    const response = await axios.post(
      "/admin/edit",
      { ...user, userId: props.user._id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("hai why close not working");
    props.onClose();
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-gray-900  outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-gray-100">
                Edit user
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.onClose()}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-2 m-3 flex-auto">
              <form className="max-w-[600px] w-full  bg-gray-900  rounded-lg">
                <div className="flex flex-col text-gray-100">
                  <label htmlFor="name">Name</label>
                  <input
                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none"
                    value={user.name}
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={valueSetting}
                  />
                </div>
                <div className="flex flex-col text-gray-100">
                  <label htmlFor="email">Email</label>
                  <input
                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:bg-gray-800 focus:outline-none"
                    value={user.email}
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={valueSetting}
                  />
                </div>

                <div className="text-center"></div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.onClose()}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={editSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
