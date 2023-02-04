import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({});
  // const { email, password } = formData;

  const handleOnChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setFormData({ ...formData, ...newInput });
  };
  return (
    <React.Fragment>
      <section>
        <h1 className="text-center font-bold mt-6 text-3xl">Forget Password</h1>
        <div className="flex justify-center items-center flex-wrap px-6 py-12 mx-auto max-w-6xl">
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img
              src="https://stories.freepiklabs.com/storage/19513/forgot-password-amico-1951.png"
              alt="password"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form>
              <input
                type="email"
                className="mb-6 w-full px-5 py-2 text-gray-700 text-xl bg-white border-gray-300 rounded-md transition ease-in-out"
                name="email"
                onChange={handleOnChange}
                placeholder="Email Address"
              />
              <div className=" mb-6 flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
                <p>
                  Don't have an account?
                  <Link
                    to={"/create-account"}
                    className=" text-red-600 ml-1 hover:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </Link>
                </p>
                <p>
                  <Link
                    to={"/login"}
                    className=" text-red-600 ml-1 hover:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login instead
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className=" bg-blue-700 w-full text-white px-[20px] py-[10px] text-sm font-medium uppercase rounded-sm shadow-md hover:bg-blue-900 transition duration-150 ease-in-out hover:shadow-lg"
              >
                send reset password
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

export default ForgetPassword;
