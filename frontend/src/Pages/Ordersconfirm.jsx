import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearCart} from "../Redux/Slice/cartSlice"


const Ordersconfirm =()=>{
const dispatch = useDispatch()
const navigate = useNavigate()
const {checkout} = useSelector((state)=>state.checkout)

// clear the cart when the order is confirmed
useEffect(()=>{
    if(checkout && checkout._id){
        dispatch(clearCart())
        localStorage.removeItem("cart")
    }
    else{
        navigate("/my-orders")
    }
},[checkout,dispatch,navigate])

const calulateEstimateDelivery =(createdAt)=>{
    const orderDate = new Date(createdAt)
    orderDate.setDate(orderDate.getDate()+5); // Add 5 day to order date
    return orderDate.toLocaleDateString()
}

    return (
        <>
        <div className="max-2-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You for Your order
            </h1>
            {checkout && (
                <div className="p-6 rounded-lg border">
                    <div className="flex justify-between mb-20">
                        {/* Order Id and Date */}
                        <div>
                            <h2 className="text-xl font-semibold">
                                Order Id:{checkout._id}

                            </h2>
                            <p className="text-gray-500">
                                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {/* Estimated Delivery */}
                        <div >
<p className="text-emerald-700 text-sm">
    Estimated Delivery:{calulateEstimateDelivery(checkout.createdAt)}
</p>
                        </div>
                    </div>
                    {/* Ordered Itesm */}
                    <div className="mb-20">
                        {checkout.checkoutItems.map((Item)=>{
                           return <div key={Item.productId} className="flex items-center mb-4"><img src={Item.image} alt={Item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                            <div>
                                <h4 className="text-md font-semibold">{Item.name}</h4>
                                <p className="text-sm text-gray-500">
                                    {Item.color} | {Item.size}
                                </p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-md">${Item.price}</p>
                                <p className="text-sm text-gray-500">QTY:{Item.quantity}</p>
                            </div>
                            </div>
                        })}
                    </div>
                    {/* Payment Delivery info */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* payment Infor */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">
                                Payment
                            </h4>
                            <p className="text-gray-600">Paypal</p>
                        </div>
                        {/* Delivery Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2"> Delivery</h4>
                            <p className="text-gray-600">
                        {checkout.shippingAddress.address}
                            </p>
                            <p className="text-gray-600">{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default Ordersconfirm