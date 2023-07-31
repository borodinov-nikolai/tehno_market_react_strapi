import React from "react";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/img/pngegg.png";
import call from "../../assets/img/call.svg";
import cart from "../../assets/img/cart.png";
import AuthorizationModal from "./AuthorizationModal";
import RegistrationModal from "./RegistrationModal/index.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/slices/userSlice";

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <NavLink to="/" className={"text-decoration-none"} >
            <Navbar.Brand>
              <img
                src={logo}
                width={"30px"}
                height={"30px"}
                className="d-inline-block"
                alt="logo"
              />{" "}
              Техно маркет
            </Navbar.Brand>
          </NavLink>
          <Nav className="me-auto">
            <Nav.Link
              href="#home "
              className="ms-5"
            >
              Главная
            </Nav.Link>
            <Nav.Link
              href="#features"
              className="ms-5"
            >
              Каталог
            </Nav.Link>
            <Nav.Link
              href="#home "
              className="ms-5"
            >
              Новости
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              className="ms-5"
            >
              О нас
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              className="ms-5"
            >
              Контакты
            </Nav.Link>
          </Nav>
          {/* 
       <Badge
            bg="outline-light"
            className="text-success fs-5"
          >
            Тест
            <br />

          </Badge> */}

          {!isAuth && <AuthorizationModal />}

          {isAuth && (
            <Button
              variant="dark"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setIsAuth(false));
              }}
              style={{ fontSize: "16px" }}
              size="sm"
            >
              <i className="bi bi-box-arrow-left me-1"></i>Выйти
            </Button>
          )}

          {/* <NavLink to='http://localhost:1337/admin'>

          <Button variant='dark' className="fs-5">Админка</Button>
        </NavLink> */}

          {/* {!isAuth && <RegistrationModal />} */}
        </Container>
      </Navbar>
      <HeaderNavbar />
    </>
  );
};

export default Header;
