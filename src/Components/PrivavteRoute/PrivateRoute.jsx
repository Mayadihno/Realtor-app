import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PrivateRoute = () => {
  const { loading, loggedIn } = UseAuth();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
