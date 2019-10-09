import React from 'react';
import './Menu.css';
import FoodCard from '../FoodCard/FoodCard';

const Menu = (props) => {
    return (
        <div className="Menu">
            {props.categories.map((category, idx) =>
                <div key={category.name}>
                    <h3 className="text-center mt-4" name={category.name}>{category.name}</h3>
                    <FoodCard 
                        foods={category.foods} 
                        handleAddToOrderBtn={props.handleAddToOrderBtn}
                    />
                </div>
            )}
        </div>
    );
};

export default Menu;