import React, { useState } from "react";

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // Add logic to send data to backend
    };

    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f4f4f4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: 0,
            padding: "20px"
        }}>
            <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                width: "450px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", color: "#333" }}>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px", fontSize: "16px" }}>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required 
                            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px" }} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px", fontSize: "16px" }}>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px" }} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px", fontSize: "16px" }}>Message:</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required 
                            style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px", height: "120px", resize: "none" }}></textarea>
                    </div>
                    <button type="submit" 
                        style={{ backgroundColor: "#007BFF", color: "white", border: "none", padding: "12px", width: "100%", cursor: "pointer", fontSize: "18px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s" }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
