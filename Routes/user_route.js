const express = require("express")

const User = require("../models/User")

const jwt = require("jsonwebtoken")
const {protect}=require("../middleware/authMiddleware")
const router =express.Router()


// @route POST /api/users/register
// @desc register a new user
// @access Public

router.post("/register",async(req,resp)=>{
    const {name,email,password}=req.body

    try{
        // Registeration Logic
        // resp.send({name,email,password})
        let user =await User.findOne({email})
        if(user){
            return resp.status(400).json({message:"User already exists"})}

            user = new User({name,email,password})
            await user.save()
            // resp.status(201).json({
            // user:{
            //     _id:user._id,
            //     name:user.name,
            //     email:user.email,
            //     role:user.role
            // }
            // })

           // Create the JWT payload
           const payload = {user:{id:user._id,role:user.role}} 

        //    sign and return the token along with the user data
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err){
                
                throw err
            }
            //send the user and token in response
            resp.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },
                token
            })
        })

        
    }
    catch(error){
        console.log(error)
        resp.status(500).send("Server Error")
    }
})

// @route Post /api/users/login
// @desc Authenticate User
// @access Public
router.post("/login",async(req,resp)=>{
    const {email,password}=req.body
    try{
        let user = await User.findOne({email})
        if(!user) return resp.status(400).json({message:"Invalid Credentials"})
        const isMatch = await user.matchPassword(password) // to match the password
    if(!isMatch){
        return resp.status(400).json({message:"Invalid Credentials"})
    }
       // Create the JWT payload
       const payload = {user:{id:user._id,role:user.role}} 

       //    sign and return the token along with the user data
       jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
           if(err){
               throw err
           }
           //send the user and token in response
           resp.json({
               user:{
                   _id:user._id,
                   name:user.name,
                   email:user.email,
                   role:user.role
               },
               token
           })
       })

    }
    catch(error){
console.error(error)
resp.status(500).send("Server Error")
    }
})


// @route Get /api/users/profile
// @desc Get the Logged in User's profile
// @access Private
router.get("/profile",protect,async(req,resp)=>{
    resp.json(req.user)
})



module.exports = router