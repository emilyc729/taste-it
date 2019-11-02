import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  let nav = props.customer ?
  

      <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
        <Link to='' className="navbar-brand"><i className="far fa-grin-wink"></i> Taste-It</Link>
        <div className="dropdown">
          <button className="btn btn-outline-success" id="navbarDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="fas fa-utensils"></span>
          </button>
          <div className="dropdown-menu dropdown-menu-right mt-1 ml-auto" aria-labelledby="navbarDropdown">
            <h5 className="dropdown-item">Hi, {props.customer.name}</h5>
            <Link to='/orders' className="dropdown-item">View Orders</Link>
            <Link to='' className="dropdown-item">Restaurants</Link>
            <Link to='' className="dropdown-item" onClick={props.handleLogout}><button className="btn btn-outline-primary">Logout</button></Link>
          </div>
        </div>
      </nav>

    :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='' className="navbar-brand"><i className="far fa-grin-wink"></i> Taste-It</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-2">
              <Link to='/login' className="btn btn-outline-info my-2 my-sm-0"><i className="button-size fas fa-sign-in-alt"></i> Login</Link>
            </li>
            <li className="nav-item">
              <Link to='/signup' className="btn btn-outline-info my-2 my-sm-0"><i className="button-size fas fa-user-plus"></i> Sign Up</Link>
            </li>
          </ul>

        </div>
      </nav>


  return (
    <div className="NavBar">
      {nav}
    </div>
  );
};

export default NavBar;