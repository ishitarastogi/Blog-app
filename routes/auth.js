const express = require('express');
const User=require('../models/User')
const router = express.Router();
 //REGISTER
router.post('/register',async (req, res) => {
    const newUser =new User({
         userName:req.body.userName,
         email:req.body.email,
         password:req.body.password 
    })
    try{
       const user= await newUser.save() 
       res.status(200).json(user)
    }catch(err){
        console.log(err)
    }
});

module.exports = router;