import React, { useState } from "react";
import "./LoginSignup.css";

function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const login = async () => {
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Login Successfull");
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/admin");
    } else {
      alert(responseData.error);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Signup Successfull");
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup_container">
        <h1>Kusini Admin {state}</h1>
        <div className="loginsignup_fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Username"
            />
          ) : (
            <></>
          )}

          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={changeHandler}
            placeholder="Phone Number"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup_login">
            Have an Account,
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="loginsignup_login">
            Create an Account,
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </p>
        )}

        <div className="loginsignup_agree"></div>
      </div>
    </div>
  );
}

export default LoginSignup;
