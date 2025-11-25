import Image2 from '../../assets/Image2.jpg'
import Image3 from '../../assets/Image3.jpg'
import { Link } from 'react-router-dom'
const GenderCollection =()=>{
    return (
        <>
        <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
{/* Women Collection */}
<div className="relative flex-1">
    <img src={Image3} alt="Women's Collection" className='w-full h-[700] object-cover ' />
    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
      <h2 className='text-2xl font-bold text-gray-900 mb-3'>
        Women's Collection</h2>  
        <Link to="/collection/all?gender=Women" className="text-gray-900 underline">
        Shop Now</Link>
    </div>
</div>
{/* Men's Collection */}
<div className="relative flex-1">
    <img src={Image2} alt="Men's Collection" className='w-full h-[700] object-cover ' />
    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
      <h2 className='text-2xl font-bold text-gray-900 mb-3'>
        Men's Collection</h2>  
        <Link to="/collection/all?gender=Men" className="text-gray-900 underline">
        Shop Now</Link>
    </div>
</div>

        </div>
        
        </section>
        </>
    )
}
export default GenderCollection