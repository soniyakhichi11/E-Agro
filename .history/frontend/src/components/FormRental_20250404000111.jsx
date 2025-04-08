import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import API from "../api/axios"

export const FormRental = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        pricePerDay: "",
        phone_number:"",
        location: "",
        userId: "",
        image: null,
        availability: "available"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userToken = localStorage.getItem("token"); // added
        console.log("🔍 Debug: Retrieved Token:", userToken); //added2

        if (!userToken) { //added
     
            alert("You must be logged in to add a tractor.");
            navigate("/login");
            return;
        }


        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) data.append(key, formData[key]); // Only add fields that have values
        });

        try {
            const response = await API.post("/tracform/addtractors", data, {
                headers: { "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${userToken}` //added2
                 }
            });

            console.log("🚀 Debug: API Response:", response);

            if (response.status === 200 || response.status === 201) {
                alert("Tractor added successfully!");
                if (onTractorAdded) {
                    onTractorAdded(response.data.tractor); // Update the Rental component
                }
                navigate("/Rental"); // Redirect to Rental page
            } else {
                alert("Failed to add tractor: " + response.data.message);
            }
        }
            
            
        catch (error) {
            console.error("Error adding tractor:", error);
        }
    };

    return (
        <div className="rental-form-container">
        <div className="rental-form">
            <h1>Earn With Us!!</h1>
            <h2>Register Your Tractor For Rent!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" onChange={handleChange} required />
    
                <label htmlFor="model">Tractor Model</label>
                <input type="text" id="model" name="model" placeholder="Tractor model" onChange={handleChange} required />
    
                <label htmlFor="image">Upload Image Of Your Tractor</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />

                <label htmlFor="pricePerDay">Price per Day</label>
                <input type="number" id="pricePerDay" name="pricePerDay" placeholder="Price per day" onChange={handleChange} required />
    
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" placeholder="Enter phone number" onChange={handleChange} required />

                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" placeholder="Location" onChange={handleChange} required />
    
                <label htmlFor="userId">User ID</label>
                <input type="text" id="userId" name="userId" placeholder="User ID" onChange={handleChange} />
    
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    
    
    );
};
