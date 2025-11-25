import { useEffect, useRef, useState } from "react"
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from "../Components/Products/FilterSidebar"
import SortOption from "../Components/Products/SortOption"
import ProductGrid from "../Components/Products/ProductGrid"
import { useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByFilters } from "../Redux/Slice/productSlice"
const CollectionPage =()=>{
    const {collection} =useParams()
    const [searchParams]=useSearchParams()
    const dispatch = useDispatch()
    const {products,loading,error}=useSelector((state)=>state.products)
    const queryParams = Object.fromEntries([...searchParams])
const sidebar=useRef(null)
const buttonRef = useRef(null);
const [isSidebarOpen,setSideBaropen]=useState(false)

useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
},[dispatch,collection,searchParams])

const toggleSidebar =(e)=>{
    e.stopPropagation()
    setSideBaropen(!isSidebarOpen)
}
const handleclickoutside =(e)=>{
    // The other side of end is when user click inside the side bar
    console.log(`sidebar current ${sidebar.current}`)
    console.log(`sidebar current contains ${sidebar.current.contains(e.target)}`)
    if(sidebar.current && !sidebar.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)){
        setSideBaropen(false)
    }
}
useEffect(()=>{
    // Add event Listener for clicks
    if(isSidebarOpen){
    document.addEventListener("mousedown",handleclickoutside)}
    // clean Event Listener
    else{
    document.removeEventListener("mousedown",handleclickoutside)
}
return ()=>{
    document.removeEventListener("mousedown",handleclickoutside)
}

},[isSidebarOpen])
// useEffect(()=>{
//     setTimeout(()=>{
//         const fetchProducts =
//         [
//             {
//                 _id:1,
//                 name: "Product 1",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=2"}]
        
//             },
//             {
//                 _id:2,
//                 name: "Product 2",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=3"}]
        
//             },
//             {
//                 _id:3,
//                 name: "Product 3",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=4"}]
        
//             },
//             {
//                 _id:4,
//                 name: "Product 4",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=5"}]
        
//             },
//             {
//                 _id:5,
//                 name: "Product 4",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=5"}]
        
//             },
//             {
//                 _id:6,
//                 name: "Product 6",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=6"}]
        
//             },
//             {
//                 _id:7,
//                 name: "Product 4",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=7"}]
        
//             },
//             {
//                 _id:8,
//                 name: "Product 4",
//                 price:100,
//                 images:[{url:"https://picsum.photos/500/500?random=8"}]
        
//             },
            
//         ]; setProducts(fetchProducts)
//     },1000)
// },[])
    return (
        <>
    <div className="flex flex-col lg:flex-row">
        {/* Mobile filter button */}
        <button ref={buttonRef} onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
            <FaFilter className="mr-2"/> Filters
        </button>
        {/* Filter Sidebar */}
        <div ref={sidebar} className={`${isSidebarOpen?"translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className="flex-grow-0 p-4 ">
            <h2 className="text-2xl uppercase mb-4">All Collections</h2>
            {/* Sort Option */}
            <SortOption/>

            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} error={error}/>

        </div>
    </div>
        </>
    )
}

export default CollectionPage