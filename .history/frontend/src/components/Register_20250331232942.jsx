
import React, { useState,useContext } from 'react';
import API from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';



export const Register = () => {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  // });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // const response = await API.post("/auth/register", formData);

      // if (response.status === 200) {
      //   const { userId, username, email } = response.data;

      // // Store user info in localStorage
      // localStorage.setItem("user", JSON.stringify({ userId, username, email }));
      // console.log("User Stored in LocalStorage:", localStorage.getItem("user"));

      // alert(`Registration successful your id is ${userId}!`);

      //   setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      // }
      // const userData = { username, email, phone, password };
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email,phone, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Store user in context
      // register({ userId: data.user.id, username: data.user.name, email: data.user.email });

      const { userId, username, email } = data; // Destructure user info from response

    // Store user info in the context
    register({ userId, username, email });

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
       console.error("Error during registration:", error); // Log error to see what it is
    // setError("Something Went Wrong");
      if (error.response && error.response.status === 400) {
        alert("Email is already in use")
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <main className="register-page">
    <div className="container">
      
      {/* Left Section with Heading */}
      <div className="left-section">
         <div className="left-section">
          <h1 className="e-agro-title">E-Agro</h1>
          <h3 className="register-text">Register yourself for a better experience</h3>
          {/* <p className='register-text2'>Welcome to E-agro please provide you details</p> */}
        </div>
        </div>

      {/* Right Section with Form */}
      <div className="right-section">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Register Here</h2>

            <label htmlFor="username"> Name</label>
            <input type="text" name="username" placeholder="Enter your name"   required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter your email"  required />

            <label htmlFor="phone">Phone</label>
            <input type="tel" name="phone" placeholder="Enter your phone number"   required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your password"   required />

            <button type="submit">Submit</button>
          </form>

          {/* Already registered? Login link */}
          <p>
            Already registered?{" "}
            <span
              onClick={() => navigate('/Login')}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  </main>
  );
};
