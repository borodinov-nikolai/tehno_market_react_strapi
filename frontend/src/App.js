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

function App() {
  const { itemList, totalPrice } = useSelector((state) => state.cart);
  const { isAuth, userId, cartId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  

  React.useEffect(() => {

    checkAuth($api, dispatch, setIsAuth, setUser);

  }, []);




  React.useEffect(() => {

    checkCart($api, isAuth, cartId, userId, dispatch, setCartId);



    getCartFromServer(cartId, $api, dispatch, setItemList, setTotalPrice);


      loadCartLocal(
        dispatch, setItemList, setTotalPrice, cartId);


  }, [isAuth, cartId]);




  React.useEffect(() => {

    saveCartOnServer(itemList, cartId, $api, totalPrice);

    saveCartLocal(itemList, totalPrice);

    
  }, [itemList, cartId]);


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container className="min-vh-100">
          <Routes>
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
