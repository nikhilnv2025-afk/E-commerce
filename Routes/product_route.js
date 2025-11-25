const express = require("express")
const Product = require("../models/product")
const {protect,admin} = require("../middleware/authMiddleware")

const router = express.Router()

// @route Post /api/products
// @desc Create a new product
// @access Private/Admin

router.post("/",protect,admin,async(req,resp)=>{
    try{
        const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku}=req.body
        const product =new Product({name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku,user:req.user._id}) // Reference to the admin user who created it

const createdProduct = await product.save()
resp.status(201).json(createdProduct)


    }
    catch(err){
        console.error(err)
        resp.status(500).send("Server Error")
    }
})


// @route PUT /api/product/:id
// @desc Update the existing product by its ID
// @acces Private/admin
router.put("/:id",protect,admin,async(req,resp)=>{
    try{
        const {name,description,price,discountPrice, countInStock, category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku}=req.body

        // Find the product by Id
        const product =await Product.findById(req.params.id)
        if(product){
            // Update the product fields
            product.name =name || product.name
            product.description =description || product.description
            product.price =price || product.price
            product.discountPrice =discountPrice || product.discountPrice
            product.countInStock =countInStock || product.countInStock
            product.category =category || product.category
            product.brand =brand || product.brand
            product.sizes =sizes || product.sizes
            product.colors =colors || product.colors
            product.collections =collections || product.collections
            product.material =material || product.material
            product.gender =gender || product.gender
            product.images =images || product.images
            product.isFeatured =isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished =isPublished !== undefined ? isPublished : product.isPublished
            product.tags =tags || product.tags
            product.dimensions =dimensions || product.dimensions
            product.weight =weight || product.weight
            product.sku =sku || product.sku
 // save the updated Product
 const UpdatedProduct = await product.save()
 resp.json(UpdatedProduct)
        }
        else{
            resp.status(404).json({message:"Product not found"})
        }
    }
    catch(err){
console.error(err)
resp.status(500).send("Server Error")
    }
})

// @route Delete /api/products/:Id
//@desc Delete a product by ID
// @acces Private/Admin
router.delete("/:id",protect,admin,async(req,resp)=>{
    try{
        // find the product by id
        const product = await Product.findById(req.params.id)
        if(product){
            // remove the product from DB
            await product.deleteOne()
            resp.json({message:"Product removed"})
        }
        else{
            resp.status(404).json({message:"Product not found"})
        }
    }
    catch(err){
        console.error(err)
        resp.status(500).send("Server Error")

    }
})

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/",async(req,resp)=>{
    try{
        const {collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}= req.query
        let query ={}
        // Filter Logic
        if(collection && collection.toLocaleLowerCase() !== "all"){
            query.collection = collection
        }
        if(category && category.toLocaleLowerCase() !== "all"){
            query.category = category
        }
        if(material){
            query.material ={$in : material.split(",")} // $in is used when we have to select the multiple things in the material
        }
        if(brand){
            query.brand ={$in : brand.split(",")} 
        }
        if(size){
            query.sizes ={$in : size.split(",")} 
        }
        if(color){
            query.colors ={$in :[color]}
        }
        if(gender){
            query.gender =gender
        }
        if(minPrice || maxPrice){
            query.price ={}
            if(minPrice){
                query.price.$gte=Number(minPrice)  // gte= greater than equal to lte= less than equal to 
            }
            if(maxPrice){
                query.price.$lte=Number(maxPrice)
            }
        }
        if(search){
            query.$or = [
                {name:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}}
            ]
        }
        // Sort Logic
        let sort ={}
        if(sortBy){
            switch (sortBy){
                case "priceAsc":
                    sort={price:1};
                    break;
                case "priceDesc":
                    sort={price:-1}
                    break;
                case "popularity":
                    sort={rating:-1}
                    break;
                default:
                    break;
            }
        }
        console.log(query)
        // fetch products and apply sorting and limit
        let products = await Product.find(query).sort(sort)
        resp.json(products)
    }
    catch(err){
console.error(500).send("server Error")
    }
})

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller",async(req,resp)=>{
    try{
const bestseller =await Product.findOne().sort({rating:-1})
if(bestseller){
    resp.json(bestseller)
}
else{
    resp.status(404).json({message:"No best Seller found"})
}
    }
    catch(error){
        console.error(error)
        resp.status(500).send("Server Error")

    }
})

// @route GET /api/product/new-arrivals
// @desc Retrieve latest 8 products - Creation Database
// @access Public
router.get("/new-arrivals",async (req,resp)=>{
    try{
        // Fetch Latest 8 products
        const NewArrivals = await Product.find().sort({createdAt:-1}).limit(8)
        resp.json(NewArrivals)
    }
    catch(err){
        console.error(err)
        resp.status(500).send("Server Error")
    }
})

// @route GET /api/product/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id",async(req,resp)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            resp.json(product)
        }
        else{
                resp.status(404).json({message:"Product not found"})
        }
    }
    catch(err){
        console.error(err)
        resp.status(500).send("Server Error")
    }
})

//@route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id",async (req,resp)=>{
    const {id}=req.params
    try{
        const product = await Product.findById(id)
        if(!product){
            return resp.status(404).json({message:"Product not found"})
        }
        const similarProduct = await Product.find({
            _id: {$ne:id}, // exclude the current Product ID
            gender: product.gender,
            category: product.category
        }).limit(4)
        resp.json(similarProduct)
    }
    catch(err){
        console.error(err)
        resp.status(500).send("Server Error")

    }
})



module.exports =router