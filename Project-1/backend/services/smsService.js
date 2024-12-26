const twilio = require("twilio");
require("dotenv").config();
const sendSMS = async (to, body) => {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  
    try {
      await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER, 
        to,
      });
    } catch (error) {
      console.log('Error sending SMS:', error);
    }
  };
  
  module.exports = sendSMS;