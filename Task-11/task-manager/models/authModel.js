const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const newSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

newSchema.pre("save",async function (next){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt)
    }
    next();
} )

const user = mongoose.model("user",newSchema);

module.exports = user