import React, {Component} from 'react';
import './Menu.css';
import FoodCard from '../FoodCard/FoodCard';
//import ordersApi from '../../services/orders-api';

class Menu extends Component {
    

    render() {
        return (
            <div className="Menu container">
                {this.props.categories.map((category, idx) =>
                    <div key={category.name}>
                        <h3 id={category.name} className="text-center" name={category.name}>{category.name}</h3>
                        <div className="row mb-4">
                        {category.foods.map((food, idx) =>
                            <FoodCard
                                key={food.id}
                                {...this.props} 
                                food={food}
                                customer={this.props.customer} 
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