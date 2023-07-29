import React from "react";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import Button from 'react-bootstrap/Button'
import logo from '../../assets/img/pngegg.png'
import call from '../../assets/img/call.svg'
import cart from '../../assets/img/cart.png'
import AuthorizationModal from "./Authorization/AuthorizationModal";
import RegistrationModal from './Authorization/RegistrationModal'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {

  



   
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home" className="animate__animated animate__fadeInDown" >
            <img src={logo} width={'30px'} height={"30px"} className="d-inline-block" alt="logo" />{' '}
            Техно маркет
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home " className="ms-5 animate__animated animate__fadeInDown">Главная</Nav.Link>
            <Nav.Link href="#features" className="ms-5 animate__animated animate__fadeInDown">Каталог</Nav.Link>
            <Nav.Link href="#home " className="ms-5 animate__animated animate__fadeInDown">Новости</Nav.Link>
            <Nav.Link href="#pricing" className="ms-5 animate__animated animate__fadeInDown">О нас</Nav.Link>
            <Nav.Link href="#pricing" className="ms-5 animate__animated animate__fadeInDown">Контакты</Nav.Link>
          </Nav>
{/* 
       <Badge
            bg="outline-light"
            className="text-success fs-5"
          >
            Тест
            <br />

          </Badge> */}

          <AuthorizationModal/>

         {/* <Button variant='dark' size=''>Выйти</Button> */}

          {/* <NavLink to='http://localhost:1337/admin'>

          <Button variant='dark' className="fs-5">Админка</Button>
        </NavLink> */}

          {/* {!isAuth && <RegistrationModal />} */}
        </Container>
      </Navbar>
      <HeaderNavbar />
    </>

  )
};

export default Header;




