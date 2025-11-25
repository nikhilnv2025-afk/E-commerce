const express = require("express")
const router = express.Router()

const Subscriber = require("../models/subscriber")

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public

router.post("/",async(req,resp)=>{
    const {email} = req.body

    if(!email){
        return resp.status(400).json({message:"Email is required"})

    }
    try{
// check if the email is already subscribed
let subscriber = await Subscriber.findOne({email})
if(subscriber){
    return resp.status(400).json({message:"Email is already Subscribed"})
}
// create a new subscriber
subscriber = new Subscriber({email})
await subscriber.save()
resp.status(201).json({message:"Successfully subscribed"})
    }
    catch(err){
console.error(err)
resp.status(500).json({message:"Server Error"})
    }
})

module.exports = router