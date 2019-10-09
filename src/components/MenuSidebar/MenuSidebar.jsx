import React from 'react';
import './MenuSidebar.css';
import {HashLink as Link} from 'react-router-hash-link'

const MenuSidebar = (props) => {
    return (
        <div className='MenuSidebar'>
            {props.menus.map((menu, idx) =>
                <div key={menu.name}>
                    <h4>{menu.name}</h4>
                    {menu.categories.map((category, idx) =>
                        <div key={idx}>
                            <Link to={`${props.location.pathname}#${category.name}`}>{category.name}</Link>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default MenuSidebar;