import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="landing-page">
      <nav className={classes.navbar}>
        <div className={classes.navbar_brand}>ADoTO</div>
        <div className={classes.navbar_items}>
          <span className={classes.navbar_label}>Home</span>
          <span className={classes.navbar_label}>Issues</span>
          <Link to="/map" className={`${classes.navbar_button} btn`}>Go to map</Link>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;
