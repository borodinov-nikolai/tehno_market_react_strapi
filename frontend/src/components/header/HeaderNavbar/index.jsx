import React from "react";
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-router-dom";
import styles from './HeaderNavbar.module.scss'

function HeaderNavbar() {
  const [visibilitySmart, setVisibilitySmart] = React.useState("none");
  const [visibilityPad, setVisibilityPad] = React.useState("none");

  return (
    <div className="bg-dark">



    


      <Container>
        <ul className={styles.menuList + ' bg-dark'}>
            <li className={styles.menuItem}>
              <NavLink to="all" className={styles.link}>Сматрфоны</NavLink>
            </li>
            <li className={styles.menuItem} >
              <NavLink to="catalog/tabs" className={styles.link}>Планшеты</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={styles.link} >Ноутбуки</NavLink>
            </li>
            <li className={styles.menuItem}>
            <NavLink className={styles.link}>Телевизоры</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink className={styles.link}>Игровые консоли</NavLink>
            </li>
        </ul>
      </Container>

    </div>

  );
}

export default HeaderNavbar;
