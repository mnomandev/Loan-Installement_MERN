const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



//register controller
const registerUser = async (req, res)=>{
    const {userName, email, password}= req.body;
    try{
    const hashPaswword = await bcrypt.hash(password,12);
    const newUser = await User({
        userName,
        email,
        password:hashPaswword
    })
    await newUser.save();
    return res.status(200).json({
        success:true,
        message:"User registered successfully",
    })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

//login controller
const loginUser = async (req, res) => {
     const {email, password} = req.body;
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

module.exports={
    registerUser
}