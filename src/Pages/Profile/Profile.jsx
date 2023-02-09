import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: auth?.currentUser?.displayName,
    email: auth?.currentUser?.email,
  });
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  const handleChange = (e) => {
    const newInput = { [e.target.name]: e.target.value };
    setFormData({ ...formData, ...newInput });
  };
  const { fullname, email } = formData;

  return (
    <React.Fragment>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6">My profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              value={fullname}
              name="fullname"
              disabled
              onChange={handleChange}
              className=" mb-6 w-full px-4 py-2 text-gray-700 text-xl bg-white border border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              value={email}
              name="email"
              disabled
              onChange={handleChange}
              className=" mb-6 w-full px-4 py-2 text-gray-700 text-xl bg-white border border-gray-300 rounded transition ease-in-out"
            />
            <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Did you want to change your name?
                <span className=" text-red-600 hover:text-red-800 cursor-pointer ml-1 transition ease-in-out duration-200">
                  Edit
                </span>
              </p>
              <p
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Profile;
