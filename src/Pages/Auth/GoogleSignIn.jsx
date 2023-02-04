import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  return (
    <React.Fragment>
      <button className="flex items-center justify-center font-medium shadow-md hover:shadow-lg hover:bg-red-700 bg-red-600 w-full py-2 px-6 uppercase text-white text-sm transition duration-150 ease-in-out rounded-sm">
        <FcGoogle fontSize={25} className="mr-1 bg-white rounded-full" />
        Continue with google
      </button>
    </React.Fragment>
  );
};

export default GoogleSignIn;
