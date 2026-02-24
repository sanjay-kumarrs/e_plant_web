
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import AdminLogin from './Components/AdminLogin'
import AdminHome from './Components/AdminHome'
import Feedback from './Components/Feedback'
import AdminFeedback from './Components/AdminFeedback'
import Profile from './Components/Profile'
import GetAllUsers from './Components/GetAllUsers'
import AddPlant from './Components/AddPlant'
import ViewPlants from './Components/ViewPlants'
import BuyPayment from './Components/BuyPayment'
import Order from './Components/Order'
import GetAllOrders from './Components/GetAllOrders'
import SingleProduct from './Components/SingleProduct'
import AddToCart from './Components/AddToCart'
import CartPayment from './Components/CartPayment'
import Discount from './Components/Discount'
import ViewDiscount from './Components/ViewDiscount'
import About from './Components/About'
import SingleDiscount from './Components/SingleDiscount'
import DiscountPayment from './Components/DiscountPayment'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/adminhome' element={<AdminHome/>}/>
      <Route path='/feedback' element={<Feedback/>}/>
      <Route path='/adminfeedback' element={<AdminFeedback/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/getallusers' element={<GetAllUsers/>}/>
      <Route path='/plant' element={<AddPlant/>}/>
      <Route path='/viewplant' element={<ViewPlants/>}/>
      <Route path='/buypayment' element={<BuyPayment/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/getallorder' element={<GetAllOrders/>}/>
      <Route path="/singleitem/:id" element={<SingleProduct/>} />
      <Route path='/cart' element={<AddToCart/>}/>
      <Route path='/cartpayment' element={<CartPayment/>}/>
      <Route path="/discount" element={<Discount/>} />
      <Route path="/viewdiscount" element={<ViewDiscount/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/discount/:id" element={<SingleDiscount />} />
      <Route path="/discountpayment/:id" element={<DiscountPayment />} />
    


    </Routes>
    
    </BrowserRouter>
    
     
    </>
  )
}

export default App
