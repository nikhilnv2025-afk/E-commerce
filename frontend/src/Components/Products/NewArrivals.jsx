import { useEffect, useRef } from "react"
import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import axios from "axios"
const NewArrivals =()=>{
    const scrollref = useRef(null)
    const [isDragging,setIsDragging] = useState(false)
    const [startX,setStartx]=useState(0)
    const [scrollLeft,setscrollLeft]=useState(false)
    const [canscrollLeft,setcanscrollLeft]=useState(false)
    const [canScrollRight,setcanScrollRight]= useState(true)
    
const [newarrivals,setNewArrivals]= useState([])
useEffect(()=>{
    const fetchNewArrivals = async()=>{
        try{
const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
setNewArrivals(response.data)
        }
        catch(err){
console.error(err)
        }
    }
    fetchNewArrivals()
},[])



 const handlemouseDown=(e)=>{
    setIsDragging(true)
    setStartx(e.pageX - scrollref.current.offsetLeft)
    setscrollLeft(scrollref.current.scrollLeft)

 }   

 const handleMouseMove =(e)=>{
    if(!isDragging) return
    const x=e.pageX-scrollref.current.offsetLeft
    const walk = x-startX
    scrollref.current.scrollLeft=scrollLeft-walk
 }
 const handleMouseUporLeave=()=>{
setIsDragging(false)

 }

const scroll=(direction)=>{
    const scrollAmount = direction === "left" ? -300:300
    scrollref.current.scrollBy({left:scrollAmount,behaviour:"smooth"})
}
    // Update Scroll button
    const updateScrollButton =()=>{
        const container=scrollref.current
if(container){
    const leftScroll=container.scrollLeft
    const rightScrollable =Math.floor(container.scrollWidth)>Math.floor(leftScroll+container.clientWidth)
    setcanscrollLeft(leftScroll>0)
    setcanScrollRight(rightScrollable)
}

        // console.log({
        //     scrollLeft:container.scrollLeft,
        //     clientWidth:container.clientWidth,
        //     contianerScrollWidth:container.scrollWidth,
        //     offsetLeft:scrollref.current.offsetLeft
        // })
    }


    useEffect(()=>{
        const container=scrollref.current
        console.log(`scrollref current elements ${container}`)
        if(container){
            container.addEventListener("scroll",updateScrollButton)
            updateScrollButton()
         
        }
    },[newarrivals])



    return (
        <>
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto text-center mb-10 relative ">
                <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                Discover our latest arrivals – fresh, trendy, and crafted just for you! Shop now and be the first to own the newest styles!
                </p>
                {/* scroll button */}
                <div className="flex justify-center md:justify-end space-x-2 mt-4">
                    <button onClick={()=>scroll("left")}
                    disabled={!canscrollLeft} className={`p-2 rounded border ${canscrollLeft ? "bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className="text-2xl"/>
                    </button>
                    <button onClick={()=>scroll("right")} disabled={!canScrollRight} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className="text-2xl"/>
                    </button>
                </div>
            </div>
            {/* Scrollabele content */}
            <div onMouseDown={handlemouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUporLeave} onMouseLeave={handleMouseUporLeave}   ref={scrollref} className={`container mx-auto overflow-x-scroll flex space-x-6 relative scrollbar-hide ${isDragging ?"cursor-grabbing":"cursor-grab"}`}>
                {newarrivals.map((product)=>(
                    <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                    <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name}
                    className="w-full h-[500px] object-cover rounded-lg"
                    draggable={false}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-black p-4 rounded-b-lg">
                        <Link to={`/product/${product._id}`} className="block">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="mt-1">${product.price}</p>
                        
                        </Link>
                    </div>
                    </div>
                ))}
            </div>
        </section>
        </>
    )
}

export default NewArrivals