import React from "react";
import "./AdminNav.css";
import KusiniLogo from "../../Assets/Kusini_logo.jpeg";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <div className="admin_navbar">
      <img src={KusiniLogo} alt="" className="admin_nav_logo" />
      {localStorage.getItem("auth-token") ? (
        <button
          onClick={() => {
            localStorage.removeItem("auth-token");
            window.location.replace("/");
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
      <BsPerson className="admin_nav_profile" />
    </div>
  );
}

export default AdminNav;
