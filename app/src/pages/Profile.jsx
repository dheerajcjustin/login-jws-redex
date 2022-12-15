import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import axios from "../config/axios";
import { changeProfilePic } from "../config/redux";
import { useSelector, useDispatch } from "react-redux";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [image, setImage] = useState(null);
  const userPic = useSelector((state) => state.profilePic);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      const token = localStorage.getItem("user");
      navigate("/");
    } else {
      console.log(token);
      axios
        .get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status) {
            setEmail(response.data.user.email);

            setName(response.data.user.name);
            if (response.data.user.profileImage) {
              dispatch(changeProfilePic(response.data.user.profileImage));
              setProfilePic(response.data.user.profileImage);
            }
            // setSecret(response.data.massage);
          }
        });
    }
  }, []);

  const imageHandler = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ehzubpgt");
    data.append("cloud_name", "ducziw6jk");
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/");
    } else {
      fetch(" https://api.cloudinary.com/v1_1/ducziw6jk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);
          axios
            .post(
              "/user/uploadImage",
              { url: data.url },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              if (response.data.status) {
              }
            });
        });
    }
  };

  return (
    <>
      <div className="flex justify-center  p-12 px-96  bg-gray-900 h-full  ">
        <div className="min-w-full rounded overflow-hidden shadow-xl   bg-emerald-500  shadow-emerald-500/50  shadow-   h-fit  text-center p-5 ">
          <div className="w-full  flex justify-center relative">
            {profilePic && !image && (
              <img
                className="w-50 h-50  rounded-full border-white border-2 "
                src={profilePic}
                alt="Sunset in the mountains"
              />
            )}
            {image && (
              <img
                className="w-50 h-50  rounded-full border-white border-2 "
                src={URL.createObjectURL(image)}
                alt="Sunset in the mountains"
              />
            )}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-100">
              Name: {name}
            </div>
            <p className="font-bold text-lg text-gray-100"> Email: {email}</p>
          </div>
          <div className="flex flex-col justify-center  ">
            <input
              type="file"
              className="mx-48"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <button
              className="bg-gray-900 p-2 text-gray-100 rounded-lg mx-44"
              onClick={imageHandler}
            >
              upload immage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
