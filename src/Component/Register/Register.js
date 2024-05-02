import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Register = () => {
  const [erroMessage, setErrorMessage] = useState("");
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    speciality: "",
    email: "",
  });

  let navigate = useNavigate();

  const handleRegisterUser = async () => {
    try {
      let response = await api.registerUser(`/user/register`, userRegister);
      setUserRegister({
        username: "",
        password: "",
        speciality: "",
        email: "",
      });
      if (response.status == 200) {
        navigate("/");
      } else {
        let message = await response.json();
        window.alert(message["message"]);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="register_main_container">
      <div className="register_form_container">
        <div className="main_form_container">
          <h3 className="title">Please Fill!</h3>
          <p className="field_name">Username</p>
          <input
            name="username"
            value={userRegister.username}
            onChange={handleInputChange}
          ></input>
          <p className="field_name">Speciality</p>
          <input
            name="speciality"
            value={userRegister.speciality}
            onChange={handleInputChange}
          ></input>
          <p className="field_name">Email</p>
          <input
            name="email"
            value={userRegister.email}
            onChange={handleInputChange}
          ></input>
          <p className="field_name">Password</p>
          <input
            name="password"
            value={userRegister.password}
            onChange={handleInputChange}
          ></input>
          <button onClick={() => handleRegisterUser()}>SignUp</button>
          <button
            onClick={() => handleBack()}
            style={{ marginTop: "10px", backgroundColor: "rgb(207, 207, 207)" }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
