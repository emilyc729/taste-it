import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

    return (
        <div className="col-md-12 mb-5 d-flex">
            <input className="form-control mr-2" type="search" placeholder="COMING SOON: Search restaurant, food type..." aria-label="Search" />
            <Link to="/" className="btn btn-outline-success"><i className="fas fa-search"></i></Link>
        </div>
    );
};

export default SearchBar;