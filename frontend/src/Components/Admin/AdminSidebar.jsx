import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa"
import { FiPlusCircle } from "react-icons/fi"
import { useDispatch } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../Redux/Slice/authSlice"
import { clearCart } from "../../Redux/Slice/cartSlice"
const AdminSidebar =({setSidebar,isSidebar})=>{
    const navigate =useNavigate()
    const dispatch =useDispatch()
    const handlelogout =()=>{
        dispatch(logout())
        dispatch(clearCart())
        navigate("/")
    }
const handlesidebar =()=>{
    setSidebar(!isSidebar)
}
    return (
        <>
        <div className="p-6 ">
            <div className="mb-6">
                <Link onClick={handlesidebar} to="/admin" className="text-2xl font-medium">Cartify</Link>
            </div>
            <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
            <NavLink onClick={handlesidebar} to="/admin/addproduct" className={({isActive})=>isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FiPlusCircle/>
                {/* This is the place where the user will be there */}
                <span>Add Product</span>
            </NavLink>
            <NavLink onClick={handlesidebar} to="/admin/products" className={({isActive})=>isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaBoxOpen/>
                {/* This is the place where the user will be there */}
                <span>Products</span>
            </NavLink>
            <NavLink onClick={handlesidebar} to="/admin/orders" className={({isActive})=>isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaClipboardList/>
                {/* This is the place where the user will be there */}
                <span>Orders</span>
            </NavLink>
            <NavLink to="/" className={({isActive})=>isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaStore/>
                {/* This is the place where the user will be there */}
                <span>Shop</span>
            </NavLink>
            <div className="mt-6">
                <button onClick={handlelogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
                <FaSignOutAlt/>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
        </div>
        </>
    )
}

export default AdminSidebar