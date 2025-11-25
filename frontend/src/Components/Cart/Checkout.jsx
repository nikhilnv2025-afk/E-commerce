import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Paypalbutton from "./Paypalbutton"
import { useDispatch, useSelector } from "react-redux"
import { createCheckout } from "../../Redux/Slice/checkoutSlice"
import { useEffect } from "react"
import axios from "axios"



const Checkout = ()=>{
    const dispatch = useDispatch()
// const navigate = useNavigate()
const {cart,loading,error}=useSelector((state)=>state.cart)
const {user}=useSelector((state)=>state.auth)


const [checkoutId,setcheckoutid]=useState(null)
const navigate =useNavigate()
const [shippingAddress, setshippingAddress]=useState({
    firstName:"",
    Lastname:"",
    address:"",
    city:"",
    postalCode:"",
    country:"",
    phone:""
})
// Ensure cart is loaded before proceeding
useEffect(()=>{
    if(!cart || !cart.products || cart.products.length === 0){
        navigate("/")
    }
},[cart,navigate])

const handleCreateCheckout =async (e)=>{
    e.preventDefault();
    // setcheckoutid(123)
    if(cart && cart.products.length >0){
        const resp = await dispatch(createCheckout({checkoutItems:cart.products,
            shippingAddress,
            paymentMethod:"Paypal",
            totalPrice:cart.totalPrice
        }))
        if(resp.payload && resp.payload._id){
            setcheckoutid(resp.payload._id) // set checkout ID if checkout was succesfull
        }
    }
}

const handlePaymentSuccess =async (details)=>{
    // console.log("Payment succesfull",details)
    try{
const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,{paymentStatus:"paid",paymentDetails:details},{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
})
if(response.status === 200){
    await handleFinalizeCheckout(checkoutId) // Finalize checkout if payment is succesfull
}
else{
    console.error(error)
}
    }
    catch(err){
        console.error(err)
    }
    navigate("/order-confirmation")
}

const handleFinalizeCheckout = async(checkoutId)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
        if(response.status === 200){
            navigate("/order-confirmation")
        }
        else{
            console.error(error)
        }
    }
    catch(err){
        console.error(err)
    }
}

if(loading){
    return <p>Loading cart....</p>
}
if(error){
    return <p>Error: {error}</p>
}
if(!cart || !cart.products || cart.products.length === 0){
    return <p>Your Cart is empty</p>
}
    return (
        <>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter ">

        {/* Left Section */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6">Checkout

            </h2>
            <form action="" onSubmit={handleCreateCheckout}>
                <h3 className="text-lg mb-4">
                    Contact Details</h3>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray-700">Email</label>
                        <input type="email" value={user ? user.email :""} className="w-full p-2 border rounded" disabled />
                    </div>
                <h3 className="text-lg mb-4 ">
                    Delivery

                </h3>
                <div className="mb-4 grid grid-cols-2 gap-4 ">
                    <div>
                        <label htmlFor="" className="block text-gray-700">First Name</label>
                        <input type="text" className="w-full p-2 border rounded" required value={shippingAddress.firstName} onChange={(e)=>setshippingAddress({...shippingAddress,firstName:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="" className="block text-gray-700">Last Name</label>
                        <input type="text" className="w-full p-2 border rounded" required value={shippingAddress.Lastname} onChange={(e)=>setshippingAddress({...shippingAddress,Lastname:e.target.value})}/>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">
Address
                    </label>
                    <input type="text" value={shippingAddress.address} onChange={(e)=>setshippingAddress({...shippingAddress,address:e.target.value})} className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4 ">
                <div>
                        <label htmlFor="" className="block text-gray-700">City</label>
                        <input type="text" className="w-full p-2 border rounded" required value={shippingAddress.city} onChange={(e)=>setshippingAddress({...shippingAddress,city:e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="" className="block text-gray-700">Postal Code</label>
                        <input type="text" className="w-full p-2 border rounded" required value={shippingAddress.postalCode} onChange={(e)=>setshippingAddress({...shippingAddress,postalCode:e.target.value})}/>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">
Country
                    </label>
                    <input type="text" value={shippingAddress.country} onChange={(e)=>setshippingAddress({...shippingAddress,country:e.target.value})} className="w-full p-2 border rounded" required/>
                </div>                <div className="mb-4">
                    <label htmlFor="" className="block text-gray-700">
Phone number
                    </label>
                    <input type="text" value={shippingAddress.phone} onChange={(e)=>setshippingAddress({...shippingAddress,phone:e.target.value})} className="w-full p-2 border rounded" required/>
                </div>
                <div className="mt-6 ">
                    {!checkoutId ? (<>
                        <button type="submit" className="w-full bg-black text-white py-3 rounded ">Continue to Payment</button>
                    </>):(<><div>
                        <h3 className="text-lg mb-4">Pay with Paypal</h3>
                        {/* Paypal Button Component */}
                                                <Paypalbutton 
                                                    amount={Number(cart.totalPrice) || 0} 
                                                    onSuccess={handlePaymentSuccess} 
                                                    onError={(err) => alert("Payment Failed. Try again later")} 
                                                    shippingAddress={shippingAddress} 
                                                />
                        </div></>)}
                </div>
            </form>
        </div>
        {/* Right section */}
        <div className="bg-gray-50 p-6 rounded-lg ">
            <h3 className="text-lg mb-4 ">Order Summary</h3>
            <div className="border-t py-4 mb-4">
                {cart.products.map((product,index)=>{
                   return <div key={index} className="flex items-start justify-between py-2 border-b">
                        <div className="flex items-start">
                            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4"/>
                            <div>
                                <h3 className="text-md">{product.name}</h3>
                                <p className="text-gray-500">Quantity:{product.quantity}</p>
                                <p className="text-gray-500">Size:{product.size}</p>
                                <p className="text-gray-500">color:{product.color}</p>

                            </div>
                        </div>
                        <p className="text-xl">${product.price?.toLocaleString()}</p>
                    </div>
                })}
            </div>
            <div className="flex justify-between items-center text-lg mb-4">
                <p>SubTotal</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-lg">
                <p>Shipping</p>
                <p>Free</p>
            </div>
            <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                <p>Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
        </div>
        </div>
        </>
    )
}
export default Checkout