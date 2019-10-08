import React from 'react';
//import { Link } from 'react-router-dom';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';

const MenuPage = (props) => {
    const menu = props.restaurant ? 
        <div>
            <MenuSidebar menus={props.restaurant.menus} />
            {props.restaurant.menus.map((menu, idx) => 
                <div key={idx}>
                <Menu categories={menu.categories} />
                </div>
            )}
            
        </div>
        :
        <div>
            Loading...
        </div>

        
    return (
        <div>
          {menu}
        </div>
    );
};

export default MenuPage;