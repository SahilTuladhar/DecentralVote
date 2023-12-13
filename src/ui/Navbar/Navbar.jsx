import React from "react";
import styles from "./Navbar.module.css";
import { Link, Links } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoCover}>
        <img
          className={styles.logo}
          src="\images\navbarlogo.png"
          alt="decentral vote logo"
        />
      </div>

      <div className={styles.navActions}>
        <Link to ='/election-list'>
          <p>My Elections</p>
        </Link>

        <p>My Profile</p>
        <p>
          <Link to="/">Log Out</Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
