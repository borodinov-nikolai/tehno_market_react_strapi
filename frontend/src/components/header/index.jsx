import React from "react";
import {Link } from "react-router-dom";
import HeaderNavbar from "./HeaderMenu";
import Button from "react-bootstrap/Button";
import logo from "../../assets/img/pngegg.png";
import AuthorizationModal from "./AuthorizationModal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setCartId, setIsAuth } from "../../redux/slices/userSlice";
import styles from './Header.module.scss'
import HeaderMenu from "./HeaderMenu";


const Header = () => {
  
  const {isAuth, cartId} = useSelector((state) => state.user);
  const {itemList} = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const counter = itemList.reduce((sum, item)=> sum + item.count, 0)






  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Link to="/" className={"text-decoration-none"} >
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
          </Link>
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
            </Nav.Link >
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




          <Link to='/cart'>
            <div className={styles.cart}>
              <i className={styles.icon + " bi bi-cart3"}>
                 {itemList.length > 0 && <div className={styles.counter}>{counter < 100 ? counter: '99+'}</div>}
                 </i>
               </div>
          </Link>

          <AuthorizationModal />

          {isAuth && (
            <Button
              variant="dark"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setIsAuth(false));
                dispatch(setCartId(null));
              }}
              style={{ fontSize: "16px" }}
              size="sm"
            >
              <i className="bi bi-box-arrow-left me-1"></i>Выйти
            </Button>
          )}



          {/* <Link to='http://localhost:1337/admin'>

          <Button variant='dark' className="fs-5">Админка</Button>
        </Link> */}

          {/* {!isAuth && <RegistrationModal />} */}
        </Container>
      </Navbar>
      <HeaderMenu />
    </>
  );
};

export default Header;
