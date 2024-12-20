const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./config/connect");
const router = require("./routes/route");
require("dotenv").config();

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.disable('x-powered-by'); //less hackers know about our stack

const PORT = process.env.PORT;

/** HTTP GET request */

app.get('/', (req, res) =>{
    res.status(201).json("Home GET Request");
});

/** api routes */
app.use('/api', router)

/** start server  only when we have valid connection */
connect().then(()=>{
    try{
        app.listen(PORT, ()=>{
            console.log(`Server running on http://localhost:${PORT}`)
        })
    }catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch (error => {
    console.log("Invalid database connection...!")
})