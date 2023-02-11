import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = () => {
  const { loading, loggedIn } = UseAuth();
  if (loading) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
