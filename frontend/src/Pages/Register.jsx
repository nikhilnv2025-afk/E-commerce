import { useState } from "react"
import register from "../assets/register.jpg"
import {Link} from "react-router-dom"
import { registerUser } from "../Redux/Slice/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { mergeCart } from "../Redux/Slice/cartSlice"

const Register =()=>{
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")
    const [name,setName]=useState("")
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation() // to check certain url and trigger them if needed
    const {user,guestId,loading} = useSelector((state)=>state.auth)
    const {cart} =useSelector((state)=>state.cart)

    // Get redirect parameter and check if it's checkout or something else
    const redirect = new URLSearchParams(location.search).get("redirect") || "/"
    const isCheckoutRedirect = redirect.includes("checkout")

    useEffect(()=>{
        if(user){
            if(cart?.products.length >0 && guestId){
                dispatch(mergeCart({guestId,user})).then(()=>{
                    navigate(isCheckoutRedirect ? "/checkout" :"/")
                })
            }
            else
            {
                navigate(isCheckoutRedirect ? "/checkout" :"/")
            }
        }
    },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch])


    const handlesubmit=(e)=>{
        e.preventDefault();
        // console.log("User Registered:",{name,email,password})
        dispatch(registerUser({name,email,password}))
    }

    return (
        <>
        <div className="flex">
            <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12 ">
                <form onSubmit={handlesubmit} action="" className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-6  ">
                <h2 className="text-xl font-medium">Cartify</h2>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
            <p className="text-center mb-6">
                Enter details to Register
            </p>
            <div className="mb-4">
                <label htmlFor="" className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter Your Email address" />
            </div>
            <div className="mb-4">
                <label htmlFor="" className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter Your Email address" />
            </div>
            <div className="mb-4">
<label htmlFor="" className="block text-sm font-semibold mb-2">Password</label>
<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="w-full p-2 border rounded " placeholder="Enter Your Password"/>
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                {loading ? "loading...":"Sign Up"}
            </button>

            <p className="mt-6 text-center text-sm">Have an account?

                <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
                Login
                </Link>
            </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={register} alt="Login to Account" className="h-[750px] w-full object-cover" />
            </div>
            </div>
        </div>
        </>
    )
}

export default Register