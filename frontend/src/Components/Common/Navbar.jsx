import {Link} from 'react-router-dom'
import {HiOutlineUser,HiOutlineShoppingBag, HiBars3, HiBars3BottomRight} from 'react-icons/hi2'
import Searchbar from './Searchbar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
const Navbar =()=>{
    const [drawerOpen, SetdrawerOpen]=useState(false)
    const [navDrawerOpen,setnavbar]=useState(false)
    const {cart} = useSelector((state)=>state.cart)
    const {user}=useSelector((state)=>state.auth)
    const cartItemCount= cart?.products?.reduce((total,product)=>total + product.quantity,0) || 0
    const togglenavdrawer =()=>{
        setnavbar(!navDrawerOpen)
    }
    const toggleCartDrawer =()=>{
        SetdrawerOpen(!drawerOpen)
    }

    return (
        <>
<nav className="container mx-auto flex items-center justify-between py-4 px-6">
    {/* left-logo */}
<div>
    <Link to='/' className="text-2xl font-medium">
    Cartify
    </Link>
</div>
<div>
    {/* Center Navigation Link */}
    <div className="hidden md:flex space-x-6">
        <Link to="/collection/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
        Men</Link>
        <Link to="/collection/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
        Women</Link>
        <Link to="/collection/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
        Top Wear</Link>
        <Link to="/collection/all?category=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
        Bottom Wear</Link>
    </div>
</div>
{/* Right- Icons */}
<div className="flex items-center space-x-4">
{
    user && user.role === "admin" && (<Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>)
}


    <Link to="/profile" className='hover:text-black'>
    <HiOutlineUser className='h-6 w-6 text-gray-700'/>
    </Link>
    <button onClick={toggleCartDrawer} className='relative hover:text-black'>
        <HiOutlineShoppingBag className='h-6 w-7 text-gray-700'/>
        {cartItemCount>0 && (<span className='absolute -top-1  bg-Main-color text-white text-xs rounded-full py-0.5 px-2'>{cartItemCount}</span>)}

    </button>
    {/* search */}
    <div className='overflow-hidden'>
    <Searchbar/>
    </div>

    <button onClick={togglenavdrawer} className='md:hidden'>
        <HiBars3BottomRight className='h-6 w-6 text-gray'/>
    </button>
</div>
</nav>
<CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>


{/* Mobile Navigation  */}
<div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0":"-translate-x-full"}`}>
<div className='flex justify-end p-4'>
    <button onClick={togglenavdrawer}>
        <IoMdClose className='h-6 w-6 text-gray-600'/>
    </button>
</div>
<div className='p-4'>
    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
    <nav className='space-y-4'>
        <Link to="/collection/all?gender=Men" onClick={togglenavdrawer} className='block text-gray-600 hover:text-black' >
            Men
        </Link>
        <Link to="/collection/all?gender=Women" onClick={togglenavdrawer} className='block text-gray-600 hover:text-black' >
            Women
        </Link>
        <Link to="/collection/all?category=Top Wear" onClick={togglenavdrawer} className='block text-gray-600 hover:text-black' >
            Top Wear
        </Link>
        <Link to="/collection/all?category=Bottom Wear" onClick={togglenavdrawer} className='block text-gray-600 hover:text-black' >
            Bottom Wear
        </Link>
    </nav>
</div>

</div>
        </>
    )
}

export default Navbar