import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.navbar_brand}>ADoTO</div>
        <div className={classes.navbar_items}>
          <Link to="/" className={`${classes.navbar_label} btn`}>Home</Link>
          <Link to="/issues" className={`${classes.navbar_label} btn`}>Issues</Link>
          <Link to="/map" className={`${classes.navbar_button} btn`}>Go to map</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
