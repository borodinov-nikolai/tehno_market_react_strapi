import React from "react";
import { Link } from "react-router-dom";
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
import Offcanvas from 'react-bootstrap/Offcanvas';
import { setBrandId, setTypeId, resetFilters } from "../../redux/slices/filtersSlice";
import $api from "../../http";

const Header = () => {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isAuth } = useSelector((state) => state.user);
  const { itemList } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const counter = itemList.reduce((sum, item) => sum + item.count, 0)


  const [types, setTypes] = React.useState([]);




  React.useEffect(() => {
    const getTypes = async () => {
      try {

        await $api.get('/types')
          .then(res => setTypes(res.data.data))
      } catch (error) {
        console.error('ошибка', error.response)
      }
    };

    getTypes();

  }, [])






  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className={styles.root}>




          <Button className={"px-2 py-0 " + styles.hamburgerBtn} variant="dark" onClick={handleShow}>
            <i className="bi bi-list fs-2 "></i>
          </Button>

          <Offcanvas data-bs-theme='dark' show={show} onHide={handleClose} className={styles.Offcanvas} >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className={styles.OffcanvasTitle} >Категории</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >

              {types.map(({ attributes, id }) => {
                return <Link key={id} style={{ textDecoration: 'none' }} to={`${process.env.REACT_APP_URL}?pagination%5Bpage%5D=1&pagination%5BpageCount%5D=2&filters%5Bname%5D%5B%24containsi%5D=&filters%5Bbrand%5D=&filters%5Btype%5D%5Bid%5D=${id}&sort%5B0%5D=price%3Aasc`}>
                  <li onClick={() => { dispatch(setTypeId(id)); dispatch(setBrandId(null)); handleClose() }} className={styles.menuItem}> {attributes.name} </li>
                </Link>
              })}

            </Offcanvas.Body>
          </Offcanvas>




          <Link to="/" className={"text-decoration-none"} >

            <Navbar.Brand onClick={() => dispatch(resetFilters())} className={styles.logo} >
              <img
                src={logo}
                className="d-inline-block"
                alt="logo"
              />{" "}
              Техно маркет
            </Navbar.Brand>

          </Link>





          <Nav className={"me-auto d-flex w-100 " + styles.navigation}>

            <Nav.Link
              href="#home "
            >
              Главная
            </Nav.Link>
            <Nav.Link
              href="#features"
            >
              Каталог
            </Nav.Link >
            <Nav.Link
              href="#home "
            >
              Новости
            </Nav.Link>
            <Nav.Link
              href="#pricing"
            >
              О нас
            </Nav.Link>
            <Nav.Link
              href="#pricing"
            >
              Контакты
            </Nav.Link>

          </Nav>






          <div className="d-flex">
            <Link to='/cart'>
              <div className={styles.cart}>
                <i className={styles.icon + " bi bi-cart3"}>
                  {itemList.length > 0 && <div className={styles.counter}>{counter < 100 ? counter : '99+'}</div>}
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
                style={{ fontSize: "16px", width: "90px", height: "40px" }}
                size="sm"
              >
                <i className="bi bi-box-arrow-left me-1"></i>Выйти
              </Button>
            )}
          </div>




        </Container>
      </Navbar>
      <HeaderMenu />
    </>
  );
};

export default Header;
