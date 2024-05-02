import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const [erroMessage, setErrorMessage] = useState("");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleLoginUser = async () => {
    try {
      let response = await api.loginUser(`/user/login`, userLogin);
      setUserLogin({
        email: "",
        password: "",
      });
      if (response.status == 200) {
        navigate("/home");
      } else {
        let message = await response.json();
        window.alert(message["message"]);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleLogin = () => {
    handleLoginUser();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="login_main_container">
      <div className="login_form_container">
        <div className="main_form_container">
          <h3 className="title">Welcome Back!</h3>
          <p className="field_name">Email</p>
          <input
            name="email"
            value={userLogin.email}
            onChange={handleInputChange}
          ></input>
          <p className="field_name">Password</p>
          <input
            name="password"
            value={userLogin.password}
            onChange={handleInputChange}
          ></input>
          <button onClick={() => handleLogin()}>LogIn</button>
          <p style={{ fontSize: "12px", marginTop: "20px" }}>
            Need to create an account?{" "}
            <a
              href="/register"
              style={{
                textDecoration: "none",
                color: "#52ab98",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
