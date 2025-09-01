// src/components/Login.js
import React, { useState } from "react";

export default function Login({ setUser, setRoute }) {
  const [formData, setFormData] = useState({
    identifier: "", // username OR email
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Match by username OR email
    const user = users.find(
      (u) =>
        (u.username === formData.identifier || u.email === formData.identifier) &&
        u.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setRoute("dashboard");
    } else {
      alert("❌ Invalid username/email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <h2>Login</h2>

        <label>Username / Email</label>
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="Enter username or email"
          autoComplete="username email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="current-password"
          required
        />

        <button type="submit" className="btn-blue">
          Login
        </button>

        {/* Forgot password link */}
        <p style={{ marginTop: "10px" }}>
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => setRoute("forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        {/* New user register link */}
        <p style={{ marginTop: "10px" }}>
          New user?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => setRoute("register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
