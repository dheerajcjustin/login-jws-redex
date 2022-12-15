import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginStatus } from "../config/redux";
import axios from "../config/axios";

export default function NavBar() {
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const loginStatus = useSelector((state) => state.loginStatus);
  const adminLogged = useSelector((state) => state.admin);
  const location = useLocation();

  const navigate = useNavigate();
  const signupButtonHandler = () => {
    navigate("/signup");
  };
  const loginButtonHandler = () => {
    navigate("/login");
  };
  const logoutButtonHandler = () => {
    dispatch(changeLoginStatus(false));
    localStorage.removeItem("user");
  };
  const profileButtonHandler = () => {
    navigate("/profile");
  };
  useEffect(() => {
    console.log(location.pathname);

    if (loginStatus) {
      const token = localStorage.getItem("user");

      if (!token) {
        const token = localStorage.getItem("user");
        navigate("/");
      } else {
        axios
          .get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.status) {
              if (response.data.user.profileImage) {
                setProfilePic(response.data.user.profileImage);
              }
              // setSecret(response.data.massage);
            }
          });
      }
    }
  }, [loginStatus]);

  if (location.pathname.match("//admin*/")) {
    return <div className=" w-full bg-black h-8"></div>;
  } else {
    return (
      <nav className="w-full bg-purple-500 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="#">
                <h2 className="text-2xl font-bold text-white">LOGO</h2>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-indigo-200">
                  <button>Contact US</button>
                </li>
              </ul>

              <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                {loginStatus && (
                  <>
                    <button className="" onClick={profileButtonHandler}>
                      {profilePic && (
                        <img
                          src={profilePic}
                          alt="fdsfgdfgg"
                          className="w-10 h-10  rounded-full border-white  border-2	inline-block "
                        />
                      )}
                    </button>
                    <button
                      className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 
                  "
                      onClick={logoutButtonHandler}
                    >
                      Logout
                    </button>
                  </>
                )}
                {!loginStatus && (
                  <>
                    <button
                      className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                      onClick={loginButtonHandler}
                    >
                      Login
                    </button>
                    <button
                      href=""
                      className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                      onClick={signupButtonHandler}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden space-x-3 md:inline-block">
            {!loginStatus && (
              <>
                <button
                  to="/signup"
                  className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  onClick={loginButtonHandler}
                >
                  Login
                </button>

                <button
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  onClick={signupButtonHandler}
                >
                  Sign up
                </button>
              </>
            )}
            {loginStatus && (
              <>
                <button className="" onClick={profileButtonHandler}>
                  {profilePic && (
                    <img
                      src={profilePic}
                      alt="fdsfgdfgg"
                      className="w-10 h-10  rounded-full border-white  border-2	inline-block "
                    />
                  )}
                </button>

                <button
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 
                "
                  onClick={logoutButtonHandler}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
