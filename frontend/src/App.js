import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Header from './components/header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import 'animate.css'
import Container from 'react-bootstrap/esm/Container';
import {useSelector, useDispatch} from 'react-redux';
import { setIsAuth } from './redux/slices/userSlice';
import Devices from './pages/Devices'
import Cart from './pages/Cart'



function App() {
   const isAuth = useSelector((state)=> state.user.isAuth);
  const dispatch = useDispatch();
      



     React.useEffect(()=>{
      function checkAuth() {
        if(localStorage.getItem('token')){
          
         return dispatch(setIsAuth(true))
        } 
          dispatch(setIsAuth(false))
      }

      checkAuth();

     },[])
    

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

