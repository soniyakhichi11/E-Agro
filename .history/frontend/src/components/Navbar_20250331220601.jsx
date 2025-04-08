
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  // const [user, setUser] = useState(null);

  const { user, logout } = useContext(AuthContext);

  // Check if user is already stored (after registration/login)
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // // Listen for storage changes (in case user logs in/out in another tab)
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedUser = localStorage.getItem("user");
  //     setUser(storedUser ? JSON.parse(storedUser) : null);
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUser(null);
  // };

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
  
      </nav>
    </header>
  );
};
