import React from 'react';
import './MenuSidebar.css';

const MenuSidebar = (props) => {
    return (
        <div className='MenuSidebar'>
            {props.menus.map((menu, idx) =>
                <div key={`${menu.name}${menu.id}`}>
                    <h4 data-toggle="collapse" data-target={`.${menu.name.replace(/\s/g, '')}${menu.id}`}>{menu.name} <i className="fas fa-angle-down"></i></h4>
                    <div className={`collapse ${menu.name.replace(/\s/g, '')}${menu.id}`}>
                        {menu.categories.map((category, idx) =>
                            
                            <a
                                key={`${category.name}${category.id}`}
                                href={`#${category.name}`}
                                onClick={() => props.handleSelection(category.name)}
                                className={props.categorySelected === category.name ? 'active' : ''}
                            >
                                {category.name}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuSidebar;