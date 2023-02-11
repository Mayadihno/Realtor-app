import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../Firebase/firebase";

const Navbar = () => {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const loadPath = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  return (
    <React.Fragment>
      <div className="bg-white border-b sticky top-0 z-50 py-3 shadow-sm">
        <header className="flex justify-between items-center px-3 mx-auto max-w-6xl">
          <div className="logo">
            <Link to={"/"}>
              <img
                src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                alt="logoImage"
                className="h-5 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <ul className="flex space-x-10">
              <Link to={"/"}>
                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    loadPath("/") && "text-black border-b-red-500"
                  }`}
                >
                  Home
                </li>
              </Link>
              <Link to={"/paypal"}>
                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    loadPath("/paypal") && "text-black border-b-red-500"
                  }`}
                >
                  paypal
                </li>
              </Link>
              <Link to={"/offers"}>
                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    loadPath("/offers") && "text-black border-b-red-500"
                  }`}
                >
                  Offers
                </li>
              </Link>
              <Link to={"/profile"}>
                <li
                  className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                    (loadPath("/profile") && "text-black border-b-red-500") ||
                    (loadPath("/login") && "text-black border-b-red-500")
                  }`}
                >
                  {pageState}
                </li>
              </Link>
            </ul>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
