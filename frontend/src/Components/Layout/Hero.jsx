import { Link } from "react-router-dom"
import image1 from "../../assets/image1.jpeg"
const Hero =()=>{
    return <>
    <section className="relative">
        <img src={image1} alt="Cartify" className="w-full h-[350px] md:h-[600px] lg:h-[750px]"/>
        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
<div className="text-center text-white p-6">
<h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">Vacation <br />Ready</h1>
<p className="text-sm tracking-tighter md:text-lg mb-6">
    Explore Our Vacation-ready Outfits with great Discounts
</p>
<Link to="/collection/all" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">
Shop Now</Link>
</div>
        </div>
    </section>
    </>
}
export default Hero