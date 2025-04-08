import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faMapMarkerAlt, faUser, faCheckCircle, faCalendarAlt, faPlus,faCalendar, faTractor, faPlusCircle, faInfoCircle, faPhone } from "@fortawesome/free-solid-svg-icons";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export const Rental = () => {
    const [tractors, setTractors] = useState([]);
    const [booking, setBooking] = useState({ tractorId: null, startDate: "", endDate: "" });
    const navigate = useNavigate();

    useEffect(() => {
        fetchTractors();
    }, []);

    const fetchTractors = async () => {
        try {
            const response = await API.get("/tracform/gettractors");
             console.log("Tractor data:", response.data); 
            setTractors(response.data);
        } catch (error) {
            console.error("Error fetching tractors:", error);
        }
    };
    // console.log("Tractor data:", tractor);

    const handleBooking = async (tractor) => {
        const userToken = localStorage.getItem("token"); // added

        if (!userToken) { //added
            
            alert("You must be logged in to book a tractor.");
            navigate("/login"); 
            return;
        }

        if (!booking.startDate || !booking.endDate) {
            alert("Please select both start and end dates.");
            return;
        }
    
       
        navigate(`/booking/${tractor._id}`, { 
            state: { 
                id: tractor._id,
                image: tractor.image || "", 
                name: tractor.name || "Unknown", 
                phone_number: tractor.phone_number || "Not Available",
                startDate: booking.startDate, // Pass start date
                endDate: booking.endDate // Pass end date
            } 
        });
    };

    

        return (
<main className="container-rental">
    {/* Sidebar Navigation */}
    <aside className="sidebar">
        <h2>Services</h2>
        <hr></hr>
        <ul>
        <li>
            <Link to ="/rental"></Link>
            <FontAwesomeIcon icon={faTractor} /> Rent Agricultural Tools</Link>
            </li>
        <li><FontAwesomeIcon icon={faPlusCircle} /> List Your Tools For Rent</li>
        <li><FontAwesomeIcon icon={faInfoCircle} /> Information And Guidelines</li>
            <hr></hr>
            <li><FontAwesomeIcon icon={faPhone} /> Contact</li>
        </ul>
        
    </aside>

    {/* Cards Container */}
    <div className="cards-container">
    

        {tractors.map((tractor) => (
            <div key={tractor._id} className="card">
                {/* <img src={tractor.image || "https://via.placeholder.com/226x176"} alt="Tractor" /> */}
                <img
      src={`http://localhost:5000${tractor.image}`}
      alt="Tractor"
      style={{ width: "300px", height: "auto" }}
    />
                <div className="card-content">
                    <h5 className="card-title">{tractor.model}</h5>
                    <div className="info">
                        <p><FontAwesomeIcon icon={faUser} /> {tractor.name}</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {tractor.location}</p>
                    </div>
                    <div className="info">
                        <p><FontAwesomeIcon icon={faRupeeSign} /> {tractor.pricePerDay}/day</p>
                        {/* <p><FontAwesomeIcon icon={faCheckCircle} /> {tractor.phone_number}</p> */}
                        {/* <p className={tractor.availability ? "available" : "unavailable"}>
                            <FontAwesomeIcon icon={faCheckCircle} /> {tractor.availability ? "Available" : "Unavailable"}
                        </p> */}
                    </div>

                    {/* Booking Section */}
                    <div className="booking">
                        <label className="date-label"> Start Date </label>
                        <input type="date" onChange={(e) => setBooking({ ...booking, startDate: e.target.value })} />
                        <br/> <br/>
                        <label  className="date-label2"> End Date</label>
                        <input type="date" onChange={(e) => setBooking({ ...booking, endDate: e.target.value })} />
                        <br/>
                        <br/> 
                        <button className="btn-rental" onClick={() => handleBooking(tractor)}>
                             <FontAwesomeIcon icon={faCalendarAlt} /> Book
</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</main>       
    );
};
