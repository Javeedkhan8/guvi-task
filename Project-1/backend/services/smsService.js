const twilio = require("twilio");
require("dotenv").config();

const formatPhoneNumber = (phoneNumber) => {
  // Ensure the phone number starts with +91 (India's country code)
  if (!phoneNumber.startsWith('+')) {
    return `+91${phoneNumber}`; // Add country code for India
  }
  return phoneNumber;
};

const sendSMS = async (to, body) => {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    const formattedPhone = formatPhoneNumber(to);
  
    try {
      await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER, 
        to:formattedPhone,
      });
    } catch (error) {
      console.log('Error sending SMS:', error);
    }
  };
  
  module.exports = sendSMS;