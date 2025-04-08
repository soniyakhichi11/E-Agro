const jwt = require('jsonwebtoken');
const User = require('../models/user-mode'); // Adjust path if necessary

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use the same secret as when generating the token

        // Attach user info to the request object
        req.user = decoded.user;
        
        next();
    } catch (error) {

        console.error("❌ Debug: Token Error:", error.message);//added
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;
