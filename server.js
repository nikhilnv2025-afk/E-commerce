const express= require("express")
const cors =require("cors")
const dotenv = require("dotenv")
dotenv.config()
const connectDB=require("./config/db")
const userRoutes = require("./Routes/user_route")
const productRoutes = require("./Routes/product_route")
const cartRoutes = require("./Routes/cartRoutes")
const checkoutRoutes =require("./Routes/checkoutRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const uploadRoutes = require("./Routes/uploadRoutes")
const subscribeRoutes = require("./Routes/subscriberRoutes")
const adminRoutes = require("./Routes/adminRoutes")
const productadminRoutes = require("./Routes/productadminRoutes")
const adminorderRoutes = require("./Routes/adminorderRoutes")

const app = express()
app.use(express.json())
app.use(cors())

 // it will upload environment variables
const Port=process.env.PORT || 8000

// connect to Database
connectDB()

app.get("/",(req,resp)=>{
    resp.send("Welcome to Cartify API: ")

})

// API Routes

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api/subscribe",subscribeRoutes)

// Admin 
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productadminRoutes)
app.use("/api/admin/orders",adminorderRoutes)

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`)
})