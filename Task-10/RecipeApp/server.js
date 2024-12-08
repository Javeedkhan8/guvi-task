const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./config/dbconfig")
const router = require("./router/reciperoutes") 
const app = express();

app.use(bodyParser.json());
connectDB();
app.use("/api/recipes",router)

const port = 2000;
app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`)
})
