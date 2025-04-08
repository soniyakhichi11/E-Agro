


import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [user, setUser] = useState(null);

  // Check if user is already stored (after registration/login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Listen for storage changes (in case user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header>
      <nav>
        {/* Left Section with Brand and Links */}
        <div className="left-section">
          <NavLink to="#" className="brand">E-Agro</NavLink>
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Contact-us">Contact Us</NavLink></li>
            <li className="dropdown">
              <NavLink to="#">Services</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to="/Rental">Book a Tractor for Rent</NavLink></li>
                <li><NavLink to="/FormRental">Rent Out Your Tractor</NavLink></li>
                <li><NavLink to="/">Crop Consultation & Guidance</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Section with User Info or Buttons */}
        <div className="action-buttons">
          {user ? (
            <div className="user-dropdown">
              <button className="user-button">
              <faUser /> {user.username} 
              </button>
              <ul className="user-menu">
                <li><strong>ID:</strong> {user.userId}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink to="/register" className="button">Register</NavLink>
              <NavLink to="/" className="button">Login</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
