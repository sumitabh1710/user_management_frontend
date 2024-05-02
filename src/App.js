import { useState } from "react";
import "./App.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/home" Component={Home}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
