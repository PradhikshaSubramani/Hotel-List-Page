import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
         Hotel Explorer
      </Link>
      <Link to="/add" className="btn-add">
         Add New Hotel
      </Link>
    </nav>
  );
};

export default Navbar;