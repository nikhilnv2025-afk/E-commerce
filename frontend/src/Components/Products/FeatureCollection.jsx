import { Link } from 'react-router-dom'
import Image4 from '../../assets/Image4.webp'
const FeatureCollection =()=>{
    return(
    <>
<section className="py-16 px-4 lg:px-0">
<div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-sky-200 rounded-3xl">
    {/* Left Content */}
    <div className="lg:w-1/2 p-8 text-center lg:text-left">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Elegance and Ease   </h2>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 ">
        Clothing designed for your daily comfort and style
        </h2>
        <p className="text-lg text-gray-600 mb-6">
        Experience effortless style and all-day comfort. Our versatile collection keeps you looking and feeling great, no matter the occasion. Perfect for work, outings, or relaxing at home—fashion meets function in every piece.
        </p>
        
        <Link to="/collection/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
        Shop Now
        </Link>
        </div>
        <div className='lg:w-1/2 h-full'>
        <img src={Image4} alt="FeatureCollection" className='w-full h-full object-cover  lg:rounded-tr-3xl lg:rounded-br-3xl' /></div>
</div>
</section>
    </>
    )
}

export default FeatureCollection