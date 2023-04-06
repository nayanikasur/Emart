import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "./Logregister.css";

const Register = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ItemsPassable = {
      emailId: email,
      pw: pass,
      uName: name,
    };
    axios
      .post("https://localhost:7262/api/Login/RegisterHere", ItemsPassable)
      .then((x) => {
        if (x.data == "Data Inserted") {
          history.push("/login");
        } else {
          alert("backend Error");
        }
      });
  };

  const onChange = (e) => {
    setemail(e.target.value);
  };
  const onChange1 = (e) => {
    setpass(e.target.value);
  };
  const onChange2 = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <h1>SIGN UP</h1>
          <label htmlFor="name" class="form-label">
            Full name
          </label>
          <input
            value={name}
            name="name"
            id="name"
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={onChange2}
          ></input>
          <label htmlFor="email" class="form-label">
            Email
          </label>
          <input
            value={email}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            className="form-control mb-3"
            onChange={onChange}
          />
          <label for="password" class="form-label">
            Password
          </label>
          <input
            value={pass}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
            className="form-control mb-3"
            onChange={onChange1}
          />
          <button type="submit" className="btn btn-primary mb-3">
            Sign up
          </button>
        </form>
        <NavLink to="/login">Already have an account? Login here.</NavLink>
      </div>
    </div>
  );
};

export default Register;
