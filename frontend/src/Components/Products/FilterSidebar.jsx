import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const FilterSidebar=()=>{
    const [searchparams,setSearchParams]=useSearchParams();
    const navigate = useNavigate()
    const [filter, setFilter]=useState(
        {
            category:"",
            gender:"",
            color:"",
            size:[],
            material:[],
            brand:[],
            minPrice:0,
            maxPrice:1000
        }
    )
const [priceRange,setPriceRange]=useState([0,1000])
const categories = ["Top Wear","Bottom Wear"];
const colors =[
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
    "Purple",
]
const size =["XS","S","M","L","XL","XXL"]
const material=[
    "Cotton",
    "Wool",
    "Denim",
    "Polyster",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
]
const brand=[
"AMI PARIS",
"AXEL ARIGATO",
"BALDININI",
"BALLY",
"BALMAIN",
"CALVIN KLEIN",
"Modern Fit",
];

const genders =["Men","Women"]
console.log(filter.size)

useEffect(()=>{
    const params=Object.fromEntries([...searchparams])
    // The aboe data is stored in the form of the object that will be taken from the url
    setFilter({
        category:params.category||"",
        gender:params.gender || "",
        color: params.color || "",
        size: params.size ? params.size.split(","):[],
        material: params.material ? params.material.split(","):[],
        brand: params.brand ? params.brand.split(","):[],
        minPrice: params.minPrice || 0,
        maxPrice: params.maxPrice || 1000
    })
    setPriceRange([0,params.maxPrice || 100])
}, [searchparams])

const handleFilterChange =(e)=>{
    const {name,value, checked,type}=e.target
    console.log({name,value,checked,type})
    let newFilters ={...filter}
    console.log(`newFilters value ${newFilters}`)
    if(type === "checkbox"){
        if(checked){
            newFilters[name] =[...(newFilters[name] || []), value]  // 
            // if there is no element than new array is created else it will be added to previous one 
        }
        else{
            newFilters[name]=newFilters[name].filter((item)=>item!==value)
        }
    }   else {
        newFilters[name] =value
    }
    setFilter(newFilters)
    // console.log(newFilters)
updateURLParams(newFilters)

}
const updateURLParams =(newFilters)=>{
    const params = new URLSearchParams()
    Object.keys(newFilters).forEach((key)=>{
        // the below condition for the key which has the value in array
        if(Array.isArray(newFilters[key]) && newFilters[key].length>0){
            console.log("hello")
            params.append(key,newFilters[key].join(",")) 
        } else if (newFilters[key]){
            params.append(key,newFilters[key])
        }
    })
    setSearchParams(params)
    navigate(`?${params.toString()}`) // ?category=Bottom+wear&Size=Xs%2cs
}

const PriceRange =(e)=>{
    const newPrice = e.target.value;
    setPriceRange([0,newPrice])
    const newFilters = {...filter,minPrice:0,maxPrice:newPrice}
    setFilter(filter)
    updateURLParams(newFilters)
}
    return (
        <>
    <div className="p-4">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
        {/* Category Filter */}
        <div className="mb-6">
<label className="block text-gray-600 font-medium mb-2">Category</label>
    {categories.map((category)=>{
       return <div key={category} className="flex items-center mb-1">
            <input type="radio" name="category" value={category} onChange={handleFilterChange} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            checked={filter.category === category}
            />
            <span className="text-gray-700">{category}</span>
        </div>
    })}

        </div>
        {/* Gender Filter */}
        <div className="mb-6">
<label className="block text-gray-600 font-medium mb-2">Gender</label>
    {genders.map((gender)=>{
       return <div key={gender} className="flex items-center mb-1">
            <input type="radio" name="gender" value={gender} 
onChange={handleFilterChange} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" checked={filter.gender === gender} />
            <span className="text-gray-700">{gender}</span>
        </div>
    })}

        </div>
        {/* Color Filter */}
        <div className="mb-6">
            <label htmlFor="" className="block text-gray-600 font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
                {
                    colors.map((color)=>{
                       return <button key={color} value={color}
                       onClick={handleFilterChange} name="color" className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-125 ${filter.color===color ? "ring-2 ring-blue-500":""}`} style={{backgroundColor:color.toLowerCase()}} ></button>
                    })
                }
            </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
            <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">Size</label>
            {size.map((size)=>(
            <div key={size} className="flex items-center mb-1">
                    <input type="checkbox" name="size" value={size}
                    onChange={handleFilterChange} className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" checked={filter.size.includes(size)} />
                    <span className="text-gray-700">{size}</span>
            </div>
            ))}
        </div>
        {/* Material Filter */}
        <div className="mb-6">
            <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">Material</label>
            {material.map((material)=>(
            <div key={material} className="flex items-center mb-1">
                    <input type="checkbox" name="material" className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" value={material} onChange={handleFilterChange} checked={filter.material.includes(material)} />
                    <span className="text-gray-700">{material}</span>
            </div>
            ))}
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
            <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">Brand</label>
            {brand.map((brand)=>(
            <div key={brand} className="flex items-center mb-1">
                    <input type="checkbox" name="brand" className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" value={brand} onChange={handleFilterChange} checked={filter.brand.includes(brand)}/>
                    <span className="text-gray-700">{brand}</span>
            </div>
            ))}
        </div>

        {/* Price Range Filter*/}
<div className="mb-8">
    <label htmlFor="" className="block text-gray-600 font-medium mb-2 ">Price Range</label>
    <input type="range" name="priceRange" min={0} max={1000} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" value={priceRange[1]} onChange={PriceRange} />
    <div className="flex justify-between text-gray-600 mt-2">
        <span>$0</span>
        <span>${priceRange[1]}</span>
    </div>
</div>

    </div>
        </>
    )
}
export default FilterSidebar