import React from 'react';
import './MenuSidebar.css';
import {Link} from 'react-router-dom';

const MenuSidebar = (props) => {
    return (
        <div className='MenuSidebar'>
            {props.menus.map((menu, idx) =>
                <div key={menu.name}>
                    {menu.name}
                    {menu.categories.map((category, idx) =>
                        <div key={idx}>
                            <li href={`#${category.name}`}>{category.name}</li>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default MenuSidebar;