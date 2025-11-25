import { useState } from "react"
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchProductsByFilters, setFilters } from "../../Redux/Slice/productSlice"

const Searchbar =()=>{
    const [searchTerm, setSearchTerm]=useState("")
    const [isOpen,setIsopen]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


const handlesearchToggle =()=>{
    setIsopen(!isOpen)
}
const handleSearch =(e)=>{
e.preventDefault()
// console.log("Search Terma",searchTerm)
dispatch(setFilters({search:searchTerm}))
dispatch(fetchProductsByFilters({search:searchTerm}))
navigate(`/collection/all?search=${searchTerm}`)
setIsopen(false)
}
    return (

        <>
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"} `} >
            {
                isOpen ? (<form onSubmit={handleSearch} className="relative flex items-center justify-center w-full" onChange={(e)=>setSearchTerm(e.target.value)}>
                    <div className="relative w-1/2">
                    {/* search bar */}
                        <input type="text" name="" id="" placeholder="search" value={searchTerm} className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700" />
                        
                        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                            <HiMagnifyingGlass className="h-6 w-6"/>
                        </button>
                        {/* close Button */}
                        <button type="button" onClick={handlesearchToggle} className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                            <HiMiniXMark className="h-6 w-6"/>
                        </button>
                    </div>

                </form>) :
                (
                    <button onClick={handlesearchToggle}>
                        <HiMagnifyingGlass className="h-6 w-6"/>
                    </button>
                )
            }
        </div>


        </>
    )
}

export default Searchbar