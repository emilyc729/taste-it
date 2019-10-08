import React from 'react';
//import { Link } from 'react-router-dom';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';

const MenuPage = (props) => {
    const menu = props.restaurant ? 
        <div className="row">
            <div className="col-md-2">
                <MenuSidebar menus={props.restaurant.menus} />
            </div>
            <div className="col-md-10">
            {props.restaurant.menus.map((menu, idx) => 
                <div key={idx}>
                <Menu categories={menu.categories} />
                </div>
            )}
            </div>
        </div>
        :
        <div>
            Loading...
        </div>

        
    return (
        <div className="MenuPage">
          {menu}
        </div>
    );
};

export default MenuPage;