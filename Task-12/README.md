# Password Reset Flow with OTP

This is a password reset flow project built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to reset their password by receiving an OTP (One-Time Password) sent to their email. The user can enter the OTP in the input box and change their password.

## Features

- **Send OTP to Email**: Users can request a password reset by providing their email. An OTP is sent to the email address.
- **OTP Verification**: Users need to enter the OTP they received to verify their identity.
- **Password Update**: After OTP verification, users can update their password.
- **Security**: The OTP is time-limited and expires after a set duration for security purposes.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email**: Nodemailer (for sending OTP emails)
- **Authentication**: JSON Web Token (JWT) for token-based authentication
- **Password Encryption**: bcrypt.js for securely storing passwords


