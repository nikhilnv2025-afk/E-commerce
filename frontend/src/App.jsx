import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import {Toaster} from "sonner"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import ProductDetails from './Components/Products/ProductDetails'
import Checkout from './Components/Cart/Checkout'
import Ordersconfirm from './Pages/Ordersconfirm'
import OrderDetails from './Pages/OrderDetails'
import Order from './Pages/Order'
import Admin from './Components/Admin/Admin'
import AdminHomePage from './Pages/AdminHomePage'
import UserManagement from './Components/Admin/UserManagement'
import ProductManagement from './Components/Admin/ProductManagement'
import EditProduct from './Components/Admin/EditProduct'
import OrderManagement from './Components/Admin/OrderManagement'
import {Provider} from 'react-redux'
import store from './Redux/store'
import ProtectedRoute from './Components/Common/ProtectedRoute'
import AddProduct from './Components/Admin/AddProducts'
import AdminOrderDetails from './Components/Admin/AdminOrderDetails'
function App() {
  

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>  {/*user Layout*/}
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='collection/:collection' element={<CollectionPage/>}/>
      <Route path='Product/:id' element={<ProductDetails/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path="order-confirmation" element={<Ordersconfirm/>}/>
      <Route path="order/:id" element={<OrderDetails/>}/>
      <Route path='my-orders' element={<Order/>}/>
         </Route>
      
      <Route path='/admin' element={<ProtectedRoute role="admin"><Admin/></ProtectedRoute>}>  {/*admin Layout*/}  
      <Route index element={<AdminHomePage/>}/>
      <Route path='addproduct' element={<AddProduct/>}/>
      <Route path='products' element={<ProductManagement/>}/>
      <Route path='products/:id/edit' element={<EditProduct/>}/>
      <Route path='orders' element={<OrderManagement/>}/>
      <Route path='orders/:id/edit' element={<AdminOrderDetails/>}/>

      
       </Route>

    </Routes>
    
    </BrowserRouter>
    </Provider>
  )
}

export default App
