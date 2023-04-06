import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useState } from "react";
import { useEffect } from "react";
import { userLogout } from "../redux/action";
import axios from "axios";

const Navbar = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [cartDetails, setcCartDetails] = useState({
    cardid: 0,
    produtos: [],
  });
  const credentialsPassable = useSelector((state) => state.checkcredential);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const log = useSelector((state) => state.user);
  console.log(log)
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const history = useHistory();


  console.log(cartDetails)

  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IS_LOGGED_IN"));
  const handleLogout = () => {
    dispatch(userLogout());
    history.push("/login");
  };

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem("IS_LOGGED_IN"));
  // });
  const state = useSelector((state) => state.handleCart);
  return (
    <div>
      <div className="logsigncart">
        {log ? (
          <button onClick={handleLogout} className="logsigncart1 px-2">
            <i className="fa fa-sign-in me-1 m-2 "></i>
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="logsigncart1 px-2">
            <i className="fa fa-sign-in me-1 m-2 "></i>
            Login
          </NavLink>
        )}
        {log ? (
          <></>
        ) : (
          <NavLink to="/register" className="logsigncart1 px-2">
            <i className="fa fa-user me-1 m-2"></i>
            Sign-up
          </NavLink>
        )}
        <NavLink to="/cart" className="logsigncart1 px-2">
          <i className="fa fa-shopping-cart me-1 m-2 "></i>
          Cart 
        </NavLink>
      </div>

      <NavLink className="topmostnavline" to="/">
        <img id="logo" src="/assets/Blacklogonobackground.png" />
        SCULPT
      </NavLink>
      <div>
        <NavLink className="Navbar" to="/" exact>
          Home
        </NavLink>
        <NavLink className="Navbar" to="/products">
          Products
        </NavLink>
        <NavLink className="Navbar" to="/about">
          About
        </NavLink>
        <NavLink className="Navbar" to="/contact">
          Contact
        </NavLink>
      </div>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-3" to="/">
            SCULPT
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li> 
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li> 
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="button">
                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                   <i className="fa fa-shopping-cart me-1 "></i> 
                   Cart ({state.length})</NavLink>
            </div>
          </div>
        </div>
      </nav> */}
    </div>
  );
};

export default Navbar;
