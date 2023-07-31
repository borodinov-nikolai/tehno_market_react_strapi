import React from "react";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";

function HeaderNavbar() {
  const [visibilitySmart, setVisibilitySmart] = React.useState("none");
  const [visibilityPad, setVisibilityPad] = React.useState("none");

  return (
    <div className="bg-dark">



      <Container>
        <div className="header__down-menu bg-dark">

          <li
            onMouseMove={() => setVisibilitySmart("")}
            onMouseOut={() => setVisibilitySmart("none")}
            data-smart
            className="header__down-menu-item header__down-menu-phones"
          >
            <NavLink
              to="all"
              className="link-white text-decoration-none animate__animated animate__flipInX"
            >
              Сматрфоны
            </NavLink>
            <ul className={`header__down-submenu ${visibilitySmart}`}>
              <NavLink
                to="catalog/poco"
                className="link-white text-decoration-none "
              >
                <li>Poco</li>
              </NavLink>
              <NavLink
                to="catalog/honor"
                className="link-white text-decoration-none"
              >
                <li>Honor</li>
              </NavLink>
              <NavLink
                to="catalog/samsung"
                className="link-white text-decoration-none"
              >
                <li>Samsung</li>
              </NavLink>
              <NavLink
                to="catalog/apple"
                className="link-white text-decoration-none"
              >
                <li>Apple</li>
              </NavLink>
              <li>Huawei</li>
              <li>Realme</li>
              <li>OnePlus</li>
              <li>Google</li>
              <NavLink
                to="catalog/xiaomi"
                className="link-white text-decoration-none"
              >
                <li>Xiaomi</li>
              </NavLink>
            </ul>
          </li>
          <li className="header__down-menu-item header__down-menu-tabs" onMouseMove={() => setVisibilityPad("")}
            onMouseOut={() => setVisibilityPad("none")}>
            <NavLink
              to="catalog/tabs"
              className="link-white text-decoration-none animate__animated animate__flipInX"
            >
              Планшеты
            </NavLink>
            <ul className={`header__down-submenu  ${visibilityPad}`}>
              <li>Apple</li>
              <li>Xiaomi</li>
              <li>Samsung</li>
              <li>Huawei</li>
            </ul>
          </li>
          <li className="header__down-menu-item header__down-menu-noutbooks">
            <NavLink className="link-white text-decoration-none animate__animated animate__flipInX" >Ноутбуки</NavLink>
            <ul className="header__down-submenu none">
              <li>MacBook Air</li>
              <li>MacBook Pro</li>
              <li>Xiaomi</li>
              <li>Huawei</li>
              <li>Honor</li>
              <li>Asus</li>
            </ul>
          </li>
          <li className="header__down-menu-item header__down-menu-tvs">
            <NavLink className="link-white text-decoration-none animate__animated animate__flipInX">Телевизоры</NavLink>
            <ul className="header__down-submenu none">
              <li>TCL</li>
              <li>LG</li>
              <li>Xiaomi</li>
              <li>Huawei</li>
              <li>ony</li>
              <li>Samsung</li>
            </ul>
          </li>
          <li className="header__down-menu-item header__down-menu-consoles">
            <NavLink className="link-white text-decoration-none animate__animated animate__flipInX">Игровые консоли</NavLink>
            <ul className="header__down-submenu none">
              <li>Sony</li>
              <li>Nintendo</li>
              <li>Microsoft</li>
            </ul>
          </li>
        </div>
      </Container>

    </div>

  );
}

export default HeaderNavbar;
