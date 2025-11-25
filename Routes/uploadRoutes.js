const express = require("express")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const streamifier = require("streamifier")

require("dotenv").config()
const router =express.Router()
// cloudinary configuration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


// Multer setup using memory storage

const storage = multer.memoryStorage()   // store the images directly into the ram
const upload = multer({storage})

router.post("/",upload.single("image"),async(req,resp)=>{
    try{
        if(!req.file){
            return resp.status(400).json({message:"No file Uploaded"})
        }
        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream = cloudinary.uploader.upload_stream((err,result)=>{
                    if(result){
                        resolve(result)
                    }
                    else{
                        reject(err)
                    }
                })
                // use Streamfier to convert the file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        }
        // call the streamUpload function 
        const result = await streamUpload(req.file.buffer)

        // Respond with the upload image upload URL

        resp.json({imageUrl:result.secure_url})
    }
    catch(err){
        console.error(err)
        resp.status(500).json({message:"Server Error"})
    }
})

module.exports = router