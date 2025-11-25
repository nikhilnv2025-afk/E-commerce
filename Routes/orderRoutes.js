const express = require("express")
const Order = require("../models/order")
const {protect}= require("../middleware/authMiddleware")

const router = express.Router()

//@route Get /api/orders/my-orders
//@desc Get logged-in Users order
//@access private
router.get("/my-orders",protect,async(req,resp)=>{
    try{
        // find the orders for the authenticated Users
        const orders = await Order.find({user:req.user._id}).sort({createdAt:-1,})
    // sort by most recent orders
   resp.json(orders)     
} 
    catch(err){
console.error(err)
resp.status(500).json({message:"Server Error"})
    }
})

// @route Get /api/order/:id
// @desc Get order details by ID
// @access Private
router.get("/:id",protect,async(req,resp)=>{
    try{
        const order =await Order.findById(req.params.id).populate("user","name email")
        if(!order){
            return resp.status(404).json({message:"Order not found"})
        }
        // Return the full order details
        resp.json(order)
    }

    catch(err){
        console.error(err)
        resp.status(500).json({message:"Server error"})
    }
})

module.exports =router