const jwt = require("jsonwebtoken");
require("dotenv").config();

 async function Auth(req, res, next) {
    try {
        // Access the authorization header to validate the request
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            // If Authorization header is missing or not formatted correctly
            return res.status(401).json({ error: "Authentication Failed" });
        }

        // Extract the token from the header
        const token = authorizationHeader.split(" ")[1];

        // Retrieve the user details of the logged-in user
        const decodedToken = await jwt.verify(token, process.env.JWT_KEY);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed" });
    }
}


function localVeriables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }

    next();
}
module.exports = {Auth,localVeriables}