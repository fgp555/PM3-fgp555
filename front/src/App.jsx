import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/Navbar/NavBar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";
import Turn from "./views/Turn/Turn";

// PrivateRoute component
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLogin = useSelector((state) => state.user.login);
  return isLogin ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <NavBar />

      <div style={{ width: "70vw", margin: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mis-turnos" element={<PrivateRoute element={MisTurnos} />} />
          <Route path="/turn/:id" element={<PrivateRoute element={Turn} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
