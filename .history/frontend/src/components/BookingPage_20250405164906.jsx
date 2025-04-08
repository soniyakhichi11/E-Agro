

import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import API from "../api/axios";
import { useNavigate } from 'react-router-dom';

export const BookingPage = () => {
    const location = useLocation();
    const { id, image, name, phone_number: ownerPhoneNumber, startDate, endDate } = location.state || {};  // Getting startDate and endDate from location.state
    const [customerPhone, setCustomerPhone] = useState('');

    const handleBooking = async () => {
        if (!customerPhone) {
            alert("Please enter your phone number.");
            return;
        }

        if (!ownerPhoneNumber || !startDate || !endDate) {
            alert("Missing required booking details. Please try again.");
            return;
        }

        const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    if (!user || !user.username) {
        alert("User information is missing. Please log in again.");
        navigate("/login");
        return;
    }

    const token = localStorage.getItem("token"); // 👈 Get token from localStorage

    if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
    }


        const bookingData = {
            name: user.username, // You can replace this with actual customer name if available
            phone_number: customerPhone,
            ownerPhoneNumber:ownerPhoneNumber, // Send the owner's phone number
            startDate: new Date(startDate).toISOString(), // Ensure dates are in ISO format
        endDate: new Date(endDate).toISOString(), // Use the end date passed from Rental page
        notifyOwner:true
        };

        
        
        console.log("Booking Data to send:", bookingData);

        try {
            // console.log(data);
            const response = await API.post(`/tracform/booktractors/book/${id}`,
                 bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // 👈 Attach token here
                    }
                });
            console.log("Booking successful:", response.data);
            if (response.status >= 200 &&  response.status<300) {  
                alert("Booking Confirmed! The owner has been notified.");
            } else {
                alert(`Booking Failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error booking tractor:", error);
        
            if (error.response) {
                console.log("Server Response:", error.response.data); 
                alert(`Booking Failed: ${error.response.data.message}`);
            } else {
                alert("An error occurred while booking.");
            }
        }
    };

    return (
        <div className="container-book">
            <div className="booking-container">
                <div className="image-box">
                    <img src={image} alt="Tractor" />
                </div>
                <div className="info-box">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Owner's Phone:</strong> {ownerPhoneNumber}</p>
                    
                    <label htmlFor="phone_number"><strong>Your Phone Number:</strong></label>
                    <input 
                        type="text" 
                        id="phone_number" 
                        name="phone_number" 
                        placeholder="Enter your phone number" 
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                    />

                    {/* <p><strong>Booking Period:</strong></p> */}
                    {/* <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p> */}

                    <button className="btn-confirm" onClick={handleBooking}>
                        Confirm Booking
                    </button>
                </div>
            </div>

            <h2>Reviews</h2>
            <div className="reviews-container">
                <ReviewBox name="Alice" stars={5} message="Great service and easy booking!" />
                <ReviewBox name="Bob" stars={4} message="Very helpful and responsive." />
                <ReviewBox name="Charlie" stars={5} message="Had an amazing experience!" />
            </div>
        </div>
    );
};

const ReviewBox = ({ name, stars, message }) => {
    return (
        <div className="review-box">
            <p><strong>{name}</strong></p>
            <p className="stars">{'★'.repeat(stars) + '☆'.repeat(5 - stars)}</p>
            <p>{message}</p>
        </div>
    );
};

