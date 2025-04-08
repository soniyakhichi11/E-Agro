import React, { useState } from "react";

const ContactPage = () => {
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
            margin: 0
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                width: "350px"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Message:</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", height: "100px", resize: "none" }}></textarea>
                    </div>
                    <button type="submit" style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "10px", width: "100%", cursor: "pointer", fontSize: "16px", borderRadius: "5px" }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
