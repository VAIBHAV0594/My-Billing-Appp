// src/components/Register.js
import React, { useState } from "react";

export default function Register({ setRoute }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate username
    if (users.find((u) => u.username === formData.username)) {
      alert("⚠️ Username already exists. Please choose another.");
      return;
    }

    // Check for duplicate email
    if (users.find((u) => u.email === formData.email)) {
      alert("⚠️ Email already registered. Try logging in.");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registration successful! Please login.");
    setRoute("login");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <h2>Create Account</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          autoComplete="username"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          autoComplete="email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
          required
        />

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="ADMIN">Admin</option>
          <option value="ACCOUNTANT">Accountant</option>
          <option value="CUSTOMER">Customer</option>
        </select>

        <button type="submit" className="btn-blue">
          Register
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => setRoute("login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
