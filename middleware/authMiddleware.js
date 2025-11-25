// it will contains the middleware to protect the Routes

const jwt = require("jsonwebtoken")
const User= require("../models/User")

// middleware to protect routes
const protect =async (req, resp, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
try{
    token=req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user =await User.findById(decoded.user.id).select("-password") // exclude the password
    next()
}
catch(error){
    console.error("Token Verification failed",error)
    resp.status(401).json({message:"Not Authorized, token failed"})
}
    }
    else
    {
        resp.status(401).json({message:"Not authorized, no token provided"})
    }
}

// middleware to check if user is admin or not
const admin =(req,resp,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        resp.status(403).json({message:"Not authorized as Admin"})
    }
}

module.exports= {protect,admin}