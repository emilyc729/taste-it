import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  let nav = props.customer ?
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <Link to='' className="navbar-brand">Taste-It</Link>
        <div className="dropdown">
          <button className="btn btn-outline-success" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="fas fa-utensils"></span>
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link to='/orders' className="dropdown-item">View Orders</Link>
            <Link to='' className="dropdown-item">All Restaurants</Link>
            <Link to='' className="dropdown-item" onClick={props.handleLogout}>LOG OUT</Link>
          </div>
        </div>
      </nav>
    </div>
    :
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='' className="navbar-brand" href="#navbar">Taste-It</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to='/login' className='nav-link'>Login</Link>
            </li>
            <li className="nav-item">
              <Link to='/signup' className='nav-link'>Sign Up</Link>
            </li>
          </ul>

        </div>
      </nav>
    </div>


  return (
    <div className='fixed-top'>
      {nav}
    </div>
  );
};

export default NavBar;