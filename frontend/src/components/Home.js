import React from "react";

export default function Home({ setRoute }) {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to Billing App</h1>
        <p className="home-subtitle">Manage your business with ease</p>
        <div className="home-buttons">
          <button className="btn-blue" onClick={() => setRoute("login")}>
            Login
          </button>
          <button className="btn-green" onClick={() => setRoute("register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
