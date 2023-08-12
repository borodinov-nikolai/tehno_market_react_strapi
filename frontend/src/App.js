import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";
import "animate.css";
import Container from "react-bootstrap/esm/Container";
import Devices from "./pages/Devices";
import Cart from "./pages/Cart";
import { useSelector, useDispatch } from "react-redux";
import { setCartId, setIsAuth, setUser } from "./redux/slices/userSlice";
import { setItemList, setTotalPrice } from "./redux/slices/cartSlice";
import {
  checkAuth,
  checkCart,
  getCartFromServer,
  loadCartLocal,
  saveCartLocal,
  saveCartOnServer,
} from "./utils/global";
import $api from "./http";
import Device from "./pages/Device";





function App() {
  const { itemList, totalPrice } = useSelector((state) => state.cart);
  const { isAuth, userId, cartId } = useSelector((state) => state.user);
  const [cartLoad, setCartLoad] = React.useState(false);
  const dispatch = useDispatch();

  

  React.useEffect(() => {
 
     // Проверяем есть ли jwt токен в локальном хранилище, если есть, сохраняем данные о пользователе в redux 

    checkAuth($api, dispatch, setIsAuth, setUser);
  
  }, []);




  React.useEffect(() => {

    // Проверяем есть ли корзина у пользователя, если нет создаем. Сохраняем id корзины в redux

    checkCart($api, isAuth, cartId, userId, dispatch, setCartId);

     // Загружаем содержимое корзины пользователя с сервера
      
    getCartFromServer(cartId, $api, dispatch, setItemList, setTotalPrice, setCartLoad);

    // Если id корзины нет, загружаем корзину из локального хранилища
    
    loadCartLocal(
        dispatch, setItemList, setTotalPrice, cartId);


  }, [isAuth, cartId]);




  React.useEffect(() => {

    // Сохраняем товары на сервер

    saveCartOnServer(itemList, cartId, $api, totalPrice, cartLoad);

    // Сохраняем товары в локальное хранилище

    saveCartLocal(itemList, totalPrice);

    
  }, [itemList, cartLoad]);


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container className="min-vh-100">
          <Routes>
            <Route path="/devices/:name" element= {<Device/>} ></Route>
            <Route path="/" element={<Devices />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
