const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    description: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    discountPrice:{
        type:Number
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    sku:{
        type:String,
        unique: true,
        required:true
    },
    category:{
        type:String,
        required:true,

    },
    brand:{
        type:String,
        default:"N/A"

    },
    sizes:{
        type:[String], // array of string,
        required:true,

    },
    colors:{
        type:[String],
        required:true
    },
    collections:{
        type:String,
        required:true
    },
    material:{
        type:String,
        default:"cotton"
    },
    gender:{
        type:String,
        enum:["Men","Women","Unisex"]
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
            altText:{
                type:String
            }
        }
    ],
    isFeatured:{
        type:Boolean,
        deafult:false
    },
    isPublished:{
        type:Boolean,
        deafult:false
    },
    rating:{
        type:Number,
        default:1
    },
    numberofReviews:{
        type:Number,
        deafult:0
    },
    tags:[String],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    },
    metaKeywords:{
        type:String
    },
    dimensions:{
        length:Number,
        width:Number,
        height:Number
    },
    weight:Number
},
    {timestamps:true}
)

module.exports =mongoose.model("Product",productSchema)