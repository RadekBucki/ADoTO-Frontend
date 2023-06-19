import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="landing-page">
      <nav className={classes.navbar}>
        <div className={`${classes.navbar_brand} mx-3`}>ADoTO</div>
        <div className={classes.navbar_items}>
          <Link to="/" className={classes.navbar_label}>Home</Link>
          <Link to="/issues" className={classes.navbar_label}>Issues</Link>
          <Link to="/map" className={`${classes.navbar_button} btn`}>Go to map</Link>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;
