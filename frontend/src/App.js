import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Header from './components/header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import 'animate.css'
import Container from 'react-bootstrap/esm/Container';
import {useSelector, useDispatch} from 'react-redux';
import { setIsAuth, setUser } from './redux/slices/userSlice';
import Devices from './pages/Devices'
import Cart from './pages/Cart'
import { setItemList, setTotalPrice } from './redux/slices/cartSlice'
import {checkAuth, loadCart, saveCart} from './utils/global'
import $api from './http'



function App() {
   const {itemList, totalPrice} = useSelector((state)=> state.cart);
   const {isAuth, userId} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
      
 
 
 
  
  
  React.useEffect(()=> {
    checkAuth($api, dispatch, setIsAuth, setUser);
    loadCart(dispatch, setItemList, setTotalPrice);
    const getCart = async()=>{
 

     await $api.get(`users/me?populate[cart][populate][cart_items]=*`)
      .then((res)=> console.log(res.data.cart))
    }
    
   
    getCart()

  }, [])
  
  
  
  React.useEffect(()=> {
    saveCart(itemList, totalPrice);
    
   
   }, [itemList, totalPrice])



 


     

  return (
    <div className="App" >

      <BrowserRouter>

       <Header/>
       <Container  className='min-vh-100'>
      <Routes>
      <Route path='/' element={<Devices/>}/>
      <Route path='/cart' element={<Cart/>}/>
      </Routes>
       </Container>
      <Footer/> 
      </BrowserRouter>

    </div>
  )
}

export default App;

