import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [hidePassword, setHidePassword] = useState(false);
  const { email, password, fullname, nickname, phoneNumber } = formData;
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setFormData({ ...formData, ...newInput });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: fullname,
        Nickname: nickname,
        phoneNumber: phoneNumber,
      });
      const usersData = users.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", usersData.uid), formDataCopy);
      toast.success("You have successfull register");
      navigate("/");
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email alredy have already been used");
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        toast.warning("Password should be more than 6 letters");
      } else {
        toast.error("Something went wrong");
        // console.log(error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <section>
        <h1 className="text-center font-bold mt-6 text-3xl">Sign Up</h1>
        <div className="flex justify-center items-center flex-wrap px-6 py-12 mx-auto max-w-6xl">
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img
              src="https://www.metrodoc-ng.com/wp-content/uploads/2019/01/signup.png"
              alt="password"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="mb-6 w-full px-5 py-2 text-gray-700 text-xl bg-white border-gray-300 rounded-md transition ease-in-out"
                name="fullname"
                onChange={handleOnChange}
                placeholder="Full Name"
              />
              <input
                type="text"
                className="mb-6 w-full px-5 py-2 text-gray-700 text-xl bg-white border-gray-300 rounded-md transition ease-in-out"
                name="nickname"
                onChange={handleOnChange}
                placeholder="Nickname"
              />
              <input
                type="tel"
                className="mb-6 w-full px-5 py-2 text-gray-700 text-xl bg-white border-gray-300 rounded-md transition ease-in-out"
                name="phonenumber"
                onChange={handleOnChange}
                placeholder="phoneNumber"
              />
              <input
                type="email"
                className="mb-6 w-full px-5 py-2 text-gray-700 text-xl bg-white border-gray-300 rounded-md transition ease-in-out"
                name="email"
                onChange={handleOnChange}
                placeholder="Email Address"
              />
              <div className="relative mb-6">
                <input
                  type={hidePassword ? "text" : "password"}
                  className="w-full px-5 py-2 text-gray-700 text-xl mt-3  bg-white border-gray-300 rounded-md transition ease-in-out"
                  name="password"
                  onChange={handleOnChange}
                  placeholder="Password"
                />
                {hidePassword ? (
                  <BsEye
                    onClick={() => setHidePassword(!hidePassword)}
                    className="absolute right-3 top-6 text-xl cursor-pointer"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={() => setHidePassword(!hidePassword)}
                    className="absolute right-3 top-6 text-xl cursor-pointer"
                  />
                )}
              </div>
              <div className=" mb-6 flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
                <p>
                  Already have account?
                  <Link
                    to={"/login"}
                    className=" text-red-600 ml-1 hover:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </p>
                <p>
                  <Link
                    to={"/forget-password"}
                    className=" text-blue-600 ml-1 hover:text-blue-700 transition duration-200 ease-in-out"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className=" bg-blue-700 w-full text-white px-[20px] py-[10px] text-sm font-medium uppercase rounded-sm shadow-md hover:bg-blue-900 transition duration-150 ease-in-out hover:shadow-lg"
              >
                Sign up
              </button>
              <div className="my-4 flex items-center before:border-gray-400 before:border-t before:flex-1  after:border-gray-400 after:border-t after:flex-1">
                <p className="text-center font-semibold mx-4">OR</p>
              </div>
              <GoogleSignIn />
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;
