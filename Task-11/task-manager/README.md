# JWT Authentication with Node.js and Express

## Overview
This project demonstrates user authentication and authorization using JWT tokens in a Node.js application with Express.js, MongoDB (via Mongoose), and JWT.

## Features
- User registration and login
- JWT-based authentication for protected routes
- Password hashing with bcrypt

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your MongoDB URI and JWT_SECRET in a `.env` file.
4. Start the server with `npm start`.

## Endpoints
1. **POST /api/auth/register**: Register a new user.
2. **POST /api/auth/login**: Login and get a JWT token.
3. **GET /api/auth/profile**: Get user profile information (protected route).

## Testing with Postman
- Import the Postman collection to test the APIs.
