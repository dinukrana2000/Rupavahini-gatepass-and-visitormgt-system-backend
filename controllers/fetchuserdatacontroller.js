const User = require("../models/userModel");
const bcrypt = require('bcryptjs');  // Hash Library for password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailValidator = require("email-validator");

const JWT_SECRET = process.env.JWT_SECRET;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

const UserData = async (req, res) => {
    const { token } = req.body;
  
    try {
      const user = jwt.verify(token, JWT_SECRET);
  
      // If the token is valid, proceed to fetch user data
      const username = user.username; // Assuming the username is stored in the JWT payload
  
      try {
        const userData = await User.findOne({ username });
  
        if (userData) {
          res.json({ status: "ok", data: userData });
        } else {
          res.status(404).json({ status: "error", data: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ status: "error", data: "Internal Server Error" });
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ status: "error", data: "Token expired" });
      } else {
        console.error("Token verification error:", error);
        res.status(500).json({ status: "error", data: "Internal Server Error" });
      }
    }
  };

  /*
  const UserData = async(req,res)=>{
    const{token}=req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET,(err,res)=>{
            if(err){
                return "token expired";
            }
            return res;  //return user as decoded payload(include email)  (Return value is always returned to the first callback function)
        });
        console.log(user);
        if(user=="token expired"){
            return res.send({status:"error",data:"token expired"});
        }
        const name = user.username;
        User.findOne({username:name}).then((data)=>{
            res.send({status:"ok",data:data});
        }).catch((error)=>{
            res.send({status:"error",data:error});
        });
    } catch (error) {
        
    }
};

*/
  
  module.exports = UserData;
  