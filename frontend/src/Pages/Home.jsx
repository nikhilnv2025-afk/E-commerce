import Hero from "../Components/Layout/Hero"
import GenderCollection from "../Components/Products/GenderCollection"
import NewArrivals from "../Components/Products/NewArrivals"
import ProductDetails from "../Components/Products/ProductDetails"
import ProductGrid from "../Components/Products/ProductGrid"
import FeatureCollection from "../Components/Products/FeatureCollection"
import FeatureSection from "../Components/Products/FeatureSection"
import {useSelector,useDispatch} from "react-redux"
import { useState } from "react"

import { useEffect } from "react"
import { fetchProductsByFilters } from "../Redux/Slice/productSlice"
import axios from "axios"
const Home =()=>{

const dispatch = useDispatch()
const {products,loading,error} = useSelector((state)=>state.products)
const [bestSellerProduct,setBestSellerProduct]= useState(null)

useEffect(()=>{
    // Fetch products for a specific GenderCollection
    dispatch(
        fetchProductsByFilters({
            gender:"Men",
            category:"Top Wear",
            limit:8
        })
    )
    // Fetch best seller product
    const fetchBestSeller = async()=>{
        try{
const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
setBestSellerProduct(response.data)
        }
        catch(err){
            console.error(err)
        }
    }
fetchBestSeller()
},[dispatch])





    return (
        <>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>
        {/* Best Seller */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(<p className="text-center">Loading best seller product</p>)}
        
        <div className="container mx-auto">
            <h2 className="text-3xl text-center font-bold mb-4">
                Top Wears for Men
            </h2>
            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
        <FeatureCollection/>
        <FeatureSection/>
        </>
    )
}
export default Home