const express = require("express")
const Checkout =require("../models/checkout")
const Cart =require("../models/cart")
const Product =require("../models/product")
const Order =require("../models/order")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

// @route POST /api/Checkout
// @desc Create a new checkout Session
// @access private
router.post("/",protect,async(req,resp)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body

    if(!checkoutItems || checkoutItems.length === 0){
        return resp.status(400).json({message:"no items in checkout"})
    }
    try{
        // Create a new checkout Session
        const newCheckout = await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid:false
        })
        console.log(`checkout created for user ${req.user._id}`)
        resp.status(201).json(newCheckout)
    }
    catch(err){
        console.error("Error creating checkout session",err)
        resp.status(500).json({message:"Server Error"})
    }
})


// @route PUT /api/checkout/:id/pay
// desc Update checkout to mark as paid after successfull payment
// @access private
router.put("/:id/pay",protect,async(req,resp)=>{
    const {paymentStatus,paymentDetails}= req.body
    try{
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout){
            return resp.status(404).json({message:"Checkout not found"})
        }
        if(paymentStatus === "paid"){
            checkout.isPaid =true
            checkout.paymentStatus = paymentStatus
            checkout.paymentDetails = paymentDetails
            checkout.paidAt= Date.now()
            await checkout.save()
            resp.status(200).json(checkout)

        }
        else{
            resp.status(400).json({message:"Invalid Payment Status"})
        }
    }
    catch(err){
        console.error(err)
        resp.status(500).json({message:"server error"})
    }
})

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private 
router.post("/:id/finalize",protect,async(req,resp)=>{
    try{
        const checkout =await Checkout.findById(req.params.id)
        if(!checkout){
            return resp.status(404).json({message:"Checkout not found"})
        }
        if(checkout.isPaid && !checkout.isFinalized){
            // create Final order based on the checkout details
            const finalOrder= await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails
            })
              // Update products stock and rating
      for (const item of checkout.checkoutItems) {
        const product = await Product.findById(item.productId); // or item.product

        if (product) {
          // Decrease stock
          product.countInStock = Math.max(product.countInStock - item.quantity, 0);

          // Update rating if rating is provided
          product.rating +=1

          await product.save();
        }
      }

            // Mark the checkout as finalized
            checkout.isFinalized =true
            checkout.finalizedAt =Date.now()
            await checkout.save()
        // Delete the cart associated with the User
        await Cart.findOneAndDelete({user:checkout.user})
        resp.status(201).json(finalOrder)
        }
        else if(checkout.isFinalized){
            resp.status(400).json({message:"Checkout already finalized"})
        }
        else{
            resp.status(400).json({message:"checkout is not paid"})
        }
    }
    catch(err){
        console.error(err)
        resp.status(500).json({message:"Server Error"})
    }
})

module.exports =router