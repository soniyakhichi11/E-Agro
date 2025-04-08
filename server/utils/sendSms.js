const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error('❌ ERROR: Twilio credentials are missing in environment variables!');
}

const client = twilio(accountSid, authToken);

// Function to clean and format phone number
const cleanPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        console.error("❌ ERROR: Phone number is missing or invalid:", phoneNumber);
        return null;
    }

    if (typeof phoneNumber !== "string") {
        phoneNumber = String(phoneNumber);  // Convert number to string
    }

    phoneNumber = phoneNumber.replace(/[^0-9+]/g, '');  // Remove unwanted characters

    // Ensure it includes the country code
    if (!phoneNumber.startsWith("+91")) {
        phoneNumber = "+91" + phoneNumber;  // Add country code if missing
    }

    return phoneNumber;
};


// Function to send SMS
const sendSms = async (phoneNumber, message) => {
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

    if (!cleanedPhoneNumber) {
        console.error('❌ ERROR: Invalid phone number provided!');
        return;
    }
    console.log("Sending SMS to Owner:", cleanedPhoneNumber);
console.log("Message:", message);

    try {
        const response = await client.messages.create({
            body: message,
            to: cleanedPhoneNumber,
            from: twilioPhoneNumber
        });
        console.log(`✅ SMS sent successfully to ${cleanedPhoneNumber}:`, response.sid);
        return response;
    } catch (error) {
        console.error('❌ Error sending SMS:', error.message);
    }
};

module.exports = { sendSms };
