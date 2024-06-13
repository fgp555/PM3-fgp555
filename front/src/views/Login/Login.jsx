// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiService";
import "./Login.css";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    username: "user123",
    password: "P4ss123",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const getUser = useSelector((state) => state.user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await login(loginUser);
      dispatch(fetchUser(userData));
      navigate("/mis-turnos");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} defaultValue={loginUser.username} name="username" type="text" placeholder="username" />
      <input onChange={handleChange} defaultValue={loginUser.password} name="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
};

export default Login;
