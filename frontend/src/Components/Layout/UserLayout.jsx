import { Outlet } from "react-router-dom"
import Footer from "../Common/footer"
import Header from "../Common/Header"

const UserLayout =()=>{
    return (
<>
{/* Header */}
<Header/>
{/* Main Content*/}
<main>
    <p></p>
    <Outlet/> 
    {/* To display the childof the userlayout */}
</main>
{/* Footer */}
<Footer/>


</>
    )
}

export default UserLayout