const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER, // Your email
    pass: SMTP_PASSWORD, // Your email password
  },
});

const sendBookingConfirmation = (to, bookingDetails) => {
  const mailOptions = {
    from:SMTP_USER,
    to,
    subject: 'Booking Confirmation',
    text: `Your booking has been confirmed! Details:
    - Vehicle: ${bookingDetails.vehicle}
    - From: ${bookingDetails.start_date}
    - To: ${bookingDetails.end_date}
    - Total Price: $${bookingDetails.total_price}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendBookingConfirmation };
