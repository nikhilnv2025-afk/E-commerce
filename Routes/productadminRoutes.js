const express = require("express")
const Product = require("../models/product")
const {protect,admin} = require("../middleware/authMiddleware")

const router = express.Router()
// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private admin
router.get("/",protect,admin,async(req,resp)=>{
    try{
const product = await Product.find({})
resp.json(product)
    }
    catch(err){
        console.error(err)
        resp.status(500).json({message:"Server Error"})
    }
})

module.exports = router