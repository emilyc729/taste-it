import React, {Component} from 'react';
import './Menu.css';
import FoodCard from '../FoodCard/FoodCard';
//import ordersApi from '../../services/orders-api';

class Menu extends Component {
    

    render() {
        return (
            <div className="Menu">
                {this.props.categories.map((category, idx) =>
                    <div key={category.name}>
                        <h3 className="text-center mt-4" name={category.name}>{category.name}</h3>
                        <div className="row">
                        {category.foods.map((food, idx) =>
                            <FoodCard
                                key={food.id}
                                {...this.props} 
                                food={food} 
                            />
                        )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default Menu;