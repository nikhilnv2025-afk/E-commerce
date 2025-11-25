import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'
const Topbar =()=>{
    return (
        <>
        <div className="bg-Main-color text-white">
<div className="container mx-auto flex justify-between items-center py-3">
    <div className='hidden pl-3 md:flex  flex items-center space-x-4'>
        <a href="#" className="hover:text-gray-300 ">
            <TbBrandMeta className='h-6 w-6'/>
        </a>
        <a href="#" className="hover:text-gray-300 ">
            <IoLogoInstagram className='h-6 w-6'/>
        </a>
        <a href="#" className="hover:text-gray-300 ">
            <RiTwitterXLine className='h-6 w-6'/>
        </a>
    </div>
    <div className='text-sm text-center flex-grow'>
        <span> We Ship the products worldwide - Fast and reliable shipping</span>

    </div>
    <div className="text-sm relative hidden md:block pr-3">
        <a href="tel:+123456789" className='hover:text-gray-300'>
            +91 (8571) 567-890
        </a>
    </div>
</div>
        </div>
        </>
    )
}
export default Topbar