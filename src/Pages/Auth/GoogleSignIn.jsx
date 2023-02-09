import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase/firebase";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Check if user is already authenticate with that email
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setDoc(docRef, {
          fullname: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Google Provider error");
    }
  };
  return (
    <React.Fragment>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center font-medium shadow-md hover:shadow-lg hover:bg-red-700 bg-red-600 w-full py-2 px-6 uppercase text-white text-sm transition duration-150 ease-in-out rounded-sm"
      >
        <FcGoogle fontSize={25} className="mr-1 bg-white rounded-full" />
        Continue with google
      </button>
    </React.Fragment>
  );
};

export default GoogleSignIn;
