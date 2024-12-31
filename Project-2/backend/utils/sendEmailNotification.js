const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Send an email notification
const sendEmailNotification = async (recipientEmail, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending email:', error.message);
  }
};

module.exports = sendEmailNotification;
