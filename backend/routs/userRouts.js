const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config()
const { userModel } = require("../model/userModel");
const { auth } = require("../middleware/auth");

const userRout = express.Router();

userRout.get("/",auth,async (req,res)=>{
let {userID,email}=req.body
    try {
        let users=await userModel.find({ _id: { $ne: userID } })
        res.status(200).send({msg:"here is all users",users})
    } catch (error) {
        res.status(404).send({msg:"can't find users"})
    }
})


userRout.get("/find/:user",auth,async (req,res)=>{
     let name=req.params.user
          try {

            const regexPattern = new RegExp(name, 'i');
            let users=await userModel.find({"Username":{$regex:regexPattern}})
            res.status(200).send({msg:"here is all users",users})
        } catch (error) {
            res.status(404).send({msg:"can't find users"})
        }
    })




userRout.post("/signup", async (req, res) => {
  let { Username, Email, Password } = req.body;

  try {
    let user=await userModel.findOne({Email})
    if(user){
        return res.status(200).send({msg:"user already exist please use anther E-mail"})
    }
    bcrypt.hash(Password, 5,async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.status(404).send({msg:"can't add user"})
        }else{

            let newUser=new userModel({Username, Email, Password:hash})
              await newUser.save()
              console.log(newUser)
              res.status(201).send({msg:"registration successful"})
        }
    });
  } catch (error) {

    res.status(404).send({msg:"registrationfailed"})
    
  }
});


userRout.post("/login",async (req,res)=>{
    let {Email , Password }=req.body
 
    try {
        let user=await userModel.findOne({Email})
        if(!user){
            return res.status(404).send({msg:"user does not exist please signup first"})
        }

        bcrypt.compare(Password, user.Password, function(err, result) {
            // result == true
            if(result){
                var token = jwt.sign({userID:user._id,email:user.Email}, process.env.SECREP_KEY);
                res.status(201).send({msg:"login success here is your token",token})
            }else{
               res.status(404).send({msg:"wrong password"})
            }
        });
    } catch (error) {
        res.status(404).send({msg:`login failed because: ${error.message}`})

    }

})
module.exports = { userRout };
