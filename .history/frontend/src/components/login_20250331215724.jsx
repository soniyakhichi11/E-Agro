import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.message);
          return;
        }
  
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
  
        alert("Login successful!");
        navigate("/"); // Redirect to homepage
      } catch (err) {
        setError("Something went wrong. Try again later.");
      }
    };
  
    return (
      <main className="register-page">
        <div className="container">
          {/* Left Section with Heading */}
          <div className="left-section">
            <h1 className="e-agro-title2">E-Agro</h1>
            <h3 className="register-text">Welcome back. Please provide your details</h3>
          </div>
  
          {/* Right Section with Form */}
          <div className="right-section">
            <div className="form-container">
              <form onSubmit={handleLogin}>
                <h2>Login Here</h2>
  
                {error && <p style={{ color: "red" }}>{error}</p>}
  
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
  
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
  
                <button type="submit">Submit</button>
              </form>
  
              {/* Redirect to Register */}
              <p>
                Haven't Registered?{" "}
                <span
                  onClick={() => navigate("/register")}
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </main>
    );
  };
  