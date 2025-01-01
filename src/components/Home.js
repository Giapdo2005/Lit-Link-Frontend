import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin, handleSignup } from "../api";
import "../styles/Home.css";

export function Home({ loggedIn }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function onHandleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      console.log("email and password are required");
      return;
    }
    try {
      const response = await handleLogin(email, password);
      console.log("Login successfully");
      loggedIn(response.id, response.fullname);
    } catch (error) {
      console.error("onLogin -> error", error);
    }
  }

  async function onHandleSignUp(e) {
    e.preventDefault();
    console.log("clicked");

    if (!fullname || !email || !password) {
      alert("Fullname, email, password are required");
    }
    if (password !== passwordConfirm) {
      alert("Please make sure your passwords match");
    }

    try {
      const response = await handleSignup(fullname, email, password);
      console.log("Signup successful");
      setIsLoginMode(true);
      setEmail("");
      setPassword("");
      setFullname("");
      setPasswordConfirm("");
    } catch (error) {
      console.error("onSignup -> error", error);
    }
  }

  return (
    <div className="intro-page">
      {/* Logo and Welcome Section */}
      <div className="welcome-section">
        <div className="logo-container">
          <span className="logo-emoji">📚</span>
          <h1 className="logo-text">LitLink</h1>
        </div>
        <p className="welcome-text">Share your reading journey with friends</p>
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="toggle-container">
          <button
            className={`toggle-button ${isLoginMode ? "active" : ""}`}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={`toggle-button ${!isLoginMode ? "active" : ""}`}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            onClick={isLoginMode ? onHandleLogin : onHandleSignUp}
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLoginMode ? (
          <p className="footer-text">
            Forgot your password?{" "}
            <Link to="/password-reset" className="text-link">
              Reset it here
            </Link>
          </p>
        ) : (
          <p className="footer-text">
            By signing up, you agree to our{" "}
            <button className="text-link">Terms</button> and{" "}
            <button className="text-link">Privacy Policy</button>
          </p>
        )}
      </div>

      <div className="page-footer">
        <p>© 2024 LitLink. All rights reserved.</p>
      </div>
    </div>
  );
}
