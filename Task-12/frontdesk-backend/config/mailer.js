const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

// https://ethereal.email/create
let nodeConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})


 const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // Body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
    var emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    }
    // Send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ message: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }))
}

module.exports = {registerMail}