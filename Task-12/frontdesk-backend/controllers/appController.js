const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator")

/** middleware for verify user */
async function verifyUser(req, res, next){
    try{
        const { username } = req.method == "GET" ? req.query : req.body;

        //check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({error:"Can't find User!"});
        next();
    }catch(error){
        return res.status(404).send({error: "Authentication Error"})
    }
}


async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        if (!password) {
            return res.status(400).send({ error: 'Password is required' });
        }

        // Check for existing username
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).send({ error: "Please use a unique username." });
        }

        // Check for existing email
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).send({ error: "Please use a unique email." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user instance
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        // Save user and send response
        await user.save();
        return res.status(201).send({ message: "User registered successfully." });

    } catch (error) {
        console.error(error); // It's a good practice to log the error
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, process.env.JWT_KEY, { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error});
    }
}




/** GET: http://localhost:3020/api/user/example123 */
async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Remove sensitive fields from the user object
        const { password, ...userData } = user.toObject();

        return res.status(200).send(userData);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



 async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // Update the data using async/await
            const updatedUser = await UserModel.updateOne({ _id: userId }, body);

            if (updatedUser.nModified === 0) {
                return res.status(404).send({ error: "User not found...!" });
            }

            return res.status(201).send({ msg: "Record Updated...!" });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}




/** GET: http://localhost:3020/api/generateOTP */
async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP})
}


/** GET: http://localhost:3020/api/verifyOTP */
async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(201).send({message: " Verify Successfully!"})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:3020/api/createResetSession */
 async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({flag: req.app.locals.resetSession})
    }
    return res.status(440).send({error: "Session expired!"});
}


// update the password when we have valid session
/** PUT: http://localhost:3020/api/resetPassword */
async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

module.exports = {
    register,
    verifyUser,
    getUser,
    verifyOTP,
    createResetSession,
    generateOTP,
    updateUser,
    resetPassword,
    login 
};