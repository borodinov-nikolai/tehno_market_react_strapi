import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './styles/style.css'
import './styles/phone.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container';
import All from './pages/smartphones/All';




function App() {


  

    
  return (
    <div className="App" >

      <Router>

       <Header/>
       <Container  className='min-vh-100'>
      <Routes>
      <Route path='/' element={<All/>}/>
      </Routes>
       </Container>
      <Footer/> 
      </Router>

    </div>
  )
}

export default App;

