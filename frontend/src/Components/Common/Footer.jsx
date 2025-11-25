import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { TbBrandMeta } from "react-icons/tb"
import { Link } from "react-router-dom"
import {FiPhoneCall} from "react-icons/fi"

const Footer =()=>{
    return (
        <>
        <footer className="borde-t py-12 r">
<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
<div>
    <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
    <p className="text-gray-500 mb-4">
        Be the first to hear about new products, exclusive events and offers.
    </p>
    <p className="font-medium text-sm text-gray-600 mb-6">Sign up and get 20% off on your first order</p>
    {/* Newsletter form */}
    <form action="" className="flex">
        <input type="email" placeholder="Enter your email" className="p-3  w-full text-sm border-t border-l border-b border-r border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required" />
        <button type="submit" className="bg-black text-white px-6 py-4 text-sm rounded-r-md hover:bg-gray-800 transition-all">
            Subscribe
        </button>
    </form>

</div>
{/* Shops Links */}
<div>
<h3 className="text-lg text-gray-800">Shop</h3>
<ul className="space-y-2 text-gray-600">
<li>
    <Link to="#" className="hover:text-gray-500">Men's Top Wear</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">Womens's Top Wear</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">Men's Bottom Wear</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">Women's Bottom Wear</Link>
</li>
</ul>
</div>
{/* Support Links */}
<div>
<h3 className="text-lg text-gray-800">Support</h3>
<ul className="space-y-2 text-gray-600">
<li>
    <Link to="#" className="hover:text-gray-500">Contact Us</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">About Us</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">FAQs</Link>
</li>
<li>
    <Link to="#" className="hover:text-gray-500">Features</Link>
</li>
</ul>
</div>
{/* Follow us */}
<div>
    <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
    <div className="flex items-center space-x-4 mb-6">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
        <TbBrandMeta className="h-6 w-6"/>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
        <IoLogoInstagram className="h-6 w-6"/>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
        <RiTwitterXLine className="h-6 w-6"/>
        </a>
    </div>
    <p className="text-gray-500">Call Us</p>
    <p>
        <FiPhoneCall className="inline-block mr-2"/>
        8571567890
    </p>
</div>
</div>
{/* Footer Bottom */}
<div className="container mx-auto mt-12 px-4 lg:px-0 border-gray-200 pt-6">
    <p className="text-gray-500 text-sm tracking-tighter text-center">© 2025, Cartify. All Rights Reserved</p>
</div>
        </footer>
        </>
    )
}
export default Footer