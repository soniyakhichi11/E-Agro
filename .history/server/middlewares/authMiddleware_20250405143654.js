
require("dotenv").config(); 
const jwt = require('jsonwebtoken');
const User = require('../models/user-mode'); // Adjust path if necessary

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     return res.status(401).json({ message: "No token provided" });
    // }

    // const token = authHeader.split(" ")[1];
    try {

         const token = req.headers.authorization?.split(' ')[1];

         console.log("🔍 Debug: Token received in middleware:", token);
        
        if (!token) {        
            console.log("❌ Debug: No token found");
            return res.status(401).json({ message: "No token, authorization denied" });
         }

        // Verify the token
        console.log("SECRET:", process.env.JWT_SECRET_KEY);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Use the same secret as when generating the token

        console.log("✅ Debug: Token successfully verified:", decoded);

         const user = await User.findById(decoded.userID);//added3
        if (!user) {
         return res.status(401).json({ message: "Invalid user" });
        }

        // Attach user info to the request object
        req.user = .user;
        
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("⏰ Debug: Token expired");
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
        console.error("❌ Debug: Token Error:", error.message);//added2
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
