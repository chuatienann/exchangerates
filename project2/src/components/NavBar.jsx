import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <>
      <header className={styles.navbar}>
        <nav>
          <ul>
            <img
              src="/currency-converter.png"
              className={`${styles.logo} col-sm-1`}
            />
            <p className={`${styles.brand} col-sm-2`}>£xchange Rate$</p>
            <li className="col-sm-2">
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="col-sm-2">
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/converter"
              >
                Tabulation
              </NavLink>
            </li>
            <li className="col-sm-2">
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/graph"
              >
                Graph
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;