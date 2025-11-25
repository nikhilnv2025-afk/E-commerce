import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"
const Header =()=>{
    return (
        <>
        <div>
            <header className="border-b border-gray-300">
            {/* TopBar */}
            <Topbar/>
            {/* Navbar*/}
            <Navbar/>
            {/* Cart Drawer */}
            </header>
        </div>
        </>
    )
}

export default Header