import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './styles/style.css'
import './styles/phone.css'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container';
import All from './pages/smartphones/All';
import {useSelector, useDispatch} from 'react-redux';
import { setIsAuth } from './redux/slices/userSlice';



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
      <Route path='/all' element={<All/>}/>
      </Routes>
       </Container>
      <Footer/> 
      </BrowserRouter>

    </div>
  )
}

export default App;

