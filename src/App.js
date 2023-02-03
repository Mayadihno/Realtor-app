import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Offers from "./Pages/Offers/Offers";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
