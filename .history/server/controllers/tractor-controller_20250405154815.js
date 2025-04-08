


const Tractor = require("../models/tractor-model");
const User = require("../models/user-mode");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const {sendSms} = require('../utils/sendSms');
require('dotenv').config();
const authMiddleware = require('../middlewares/authMiddleware')

console.log("Twilio Account SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Twilio Auth Token:", process.env.TWILIO_AUTH_TOKEN ? "Loaded" : "Not Loaded");



// Set up storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

const sendSMSToOwner = async (ownerPhoneNumber, ownerName, tractorName, bookingDetails) => {
    console.log("🚀 Debug: ownerPhoneNumber:", ownerPhoneNumber);
    
    if (!ownerPhoneNumber) {
        console.error("❌ ERROR: Owner phone number is missing!");
        return;
    }

    const message = `Hello ${ownerName},

You have received a new booking for your tractor (${tractorName}).

Booking details:
Customer Name: ${bookingDetails.name}
Customer Phone Number: ${bookingDetails.phone_number}
Start Date: ${bookingDetails.startDate}
End Date: ${bookingDetails.endDate}

Please contact the customer for further coordination.`;

    // Call sendSms utility function
    await sendSms(ownerPhoneNumber, message);
};


                            //=
exports.addTractorForRent = async (req, res) => {

    console.log("🔥 addTractorForRent called");
  // authMiddleware // added now

    // added this
    // console.log("Route hit! Request received.");
    // console.log("Body:", req.body);
    // console.log("File:", req.file);

 
    // async(req,res) =>{ //added now
    try {
        const { name, model, pricePerDay, phone_number, location } = req.body;

        const userId = req.user._id; //added now
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Correctly get image path

        if (req.user._id !== userId) { //added
            return res.status(403).json({ message: "You are not authorized to add a tractor for rent." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Owner not found." });
        }

        const tractor = new Tractor({
            name,
            model,
            image: imagePath, // Store image path
            pricePerDay,
            phone_number,
            location,
            userId,
            availability: true
        });

        await tractor.save();
        res.status(201).json({ message: "Tractor listed for rent successfully!", tractor });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: "Error listing tractor for rent", error: error.message });
    }
}
 


// Get All Tractors
exports.getAllTractors = async (req, res) => {
    try {
        const tractors = await Tractor.find().populate("userId", "name contactNumber location");
        res.status(200).json(tractors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tractors", error });
    }
};


//book tractor
exports.bookTractor = async (req, res) => {

    
    
    const { id } = req.params;  // Ensure 'id' matches route parameter name
    const { startDate, endDate, name, phone_number, ownerPhoneNumber,notifyOwner } = req.body;


    console.log("Booking Tractor:", id);
    console.log("Start Date:", startDate, "End Date:", endDate);
    console.log("Owner Phone Number: ", ownerPhoneNumber);
    console.log("Customer Phone Number: ", phone_number);
    console.log("Notify Owner:", notifyOwner); 

   
    try {
        // Fetch tractor without creating a new instance
        const tractor = await Tractor.findById(id);
        if (!tractor) {
            return res.status(404).json({ message: "Tractor not found." });
        }

        console.log("Existing Rental Periods for Tractor:", tractor.rentalPeriods);


        if (!ownerPhoneNumber) {
            return res.status(400).json({ message: "❌ Owner's phone number is missing in request body." });
        }


        // Check for overlapping rental periods
        const isBooked = tractor.rentalPeriods.some(period =>
            new Date(startDate) <= period.endDate && new Date(endDate) >= period.startDate
        );

        if (isBooked) {
            return res.status(400).json({ message: "Tractor is not available for the selected dates." });
        }
        console.log("Checking availability for Start Date:", new Date(startDate));
        console.log("Checking availability for End Date:", new Date(endDate));


        // Add the rental period
        tractor.rentalPeriods.push({ startDate: new Date(startDate), endDate: new Date(endDate) });
        
        // Update availability without changing other fields
        tractor.availability = false;

        // Use updateOne instead of save to only update the necessary fields
        const updatedTractor = await Tractor.updateOne(
            { _id: tractor._id }, 
            { 
                $set: { 
                    rentalPeriods: tractor.rentalPeriods, 
                    availability: tractor.availability 
                }
            }
        );

        if (updatedTractor.nModified === 0) {
            return res.status(500).json({ message: "Error updating tractor availability." });
        }

        // if change this change
        if(notifyOwner){
        const owner = await User.findById(tractor.userId);
        if (owner) {
            const ownerPhoneNumber = owner.phone;
            const bookingDetails = {
                name,
                phone_number,
                startDate,
                endDate
            };

            // Send SMS to the owner
           
          const smsResult=   await sendSMSToOwner(ownerPhoneNumber, owner.name, tractor.name, bookingDetails);
          console.log("SMS result:", smsResult);
            
        }
    }

        res.status(200).json({ message: "Tractor booked successfully!", tractor });
    } catch (error) {
        console.error("Error booking tractor:", error);
        res.status(500).json({ message: "Error booking tractor", error: error.message });
    }
}
};