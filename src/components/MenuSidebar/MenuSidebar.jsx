import React from 'react';
import './MenuSidebar.css';
import {Link} from 'react-router-dom';

const MenuSidebar = (props) => {
    return (
        <div className='MenuSidebar'>
            {props.menus.map((menu, idx) =>
                <div key={menu.name}>
                    <h4>{menu.name}</h4>
                    {menu.categories.map((category, idx) =>
                        <div key={idx}>
                            <a href={`#${category.name}`}>{category.name}</a>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default MenuSidebar;