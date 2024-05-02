import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div className="navbar_main_container">
      <div className="navabr_container">
        <h1 style={{ paddingBottom: "40px" }}>User Management</h1>
        <div className="navbar_nav">
          <p style={{ margin: 0, paddingBottom: "15px", paddingTop: "15px" }}>
            Profile
          </p>
        </div>
        <div className="navbar_nav">
          <p
            style={{ margin: 0, paddingBottom: "15px", paddingTop: "15px" }}
            onClick={() => handleLogOut()}
          >
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
