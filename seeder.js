// This script is for populating data in the database


const mongoose =require("mongoose")
const dotenv =require("dotenv")
const Product = require("./models/product")
const User = require("./models/User")
const products = require("./data/products")
const Cart = require("./models/cart")
const product = require("./models/product")

dotenv.config();

// connect to mongodb Database

mongoose.connect(process.env.MONGO_URI)

// Function to seed data
 const seedData = async()=>{
    try{
        // clear Previous data
        await Product.deleteMany() // it will delete all the productSchema
        await Cart.deleteMany()

        // create a default admin user
        const createdUser = await User.create({
            name:"Admin User",
            email:"admin123@example.com",
            password:"123456",
            role:"admin"

        })
        // Assign the default UserId to each product
        const userID = createdUser._id
        const sampleProducts = products.map((product)=>{
            return {...product,user:userID}
        })

        // Insert the products in the Database
        await Product.insertMany(sampleProducts)
        console.log("Product data seeded successfully")
        process.exit()
    }
    catch(err){
        console.error("Error seeding the data", err)
        process.exit(1)
    }
 }

 seedData()