import React, {Component} from 'react';
import './Menu.css';
import FoodCard from '../FoodCard/FoodCard';
import ordersApi from '../../services/orders-api';

class Menu extends Component {
    state = {
        customer_orders: []
    }

    async componentDidMount() {
        const customer_orders = await ordersApi.getAllOrders();
        this.setState({customer_orders: customer_orders});
    }

    genRandomOrderNum() {
        return Math.random().toString(36).substring(3);
    }

    handleCreateOrder = async ()  => {
        const ordersCopy = [...this.state.customer_orders];
        console.log(ordersCopy);
        const orderObj = {
            restaurant_name: this.props.restaurant.name,
            restaurant_id: this.props.restaurant.id,
            order_num: this.genRandomOrderNum(),
            total_items: 0,
            total_price: 0,
            food_items: []
        }
        const newOrder = await ordersApi.createOrder(orderObj);
        console.log(newOrder);

        if(!ordersCopy) {
            this.setState({customer_orders: [...ordersCopy, newOrder]});
        }

    }

    handleAddFoodItem = () => {
        console.log('add item to cart');
    }

    //check if restaurant already has an order
    hasOrderCreated = () => {
        //check if restaurant.id already exits in arry of order objs
        ///[{restaurant_id}]
        console.log(this.props.restaurant.id);
       for(var i = 0; i < this.state.customer_orders.length; i++) {
        
           if(parseInt(this.state.customer_orders[i].restaurant_id) === this.props.restaurant.id) {
              return true;
           } 
           
       }
       return false;
    }


    render() {
        return (
            <div className="Menu">
                {this.props.categories.map((category, idx) =>
                    <div key={category.name}>
                        <h3 className="text-center mt-4" name={category.name}>{category.name}</h3>
                        <FoodCard 
                            foods={category.foods} 
                            customer_orders={this.state.customer_orders}
                            handleAddToOrderBtn={this.state.customer_orders && this.hasOrderCreated() ? this.handleAddFoodItem : this.handleCreateOrder}
                        />
                    </div>
                )}
            </div>
        );
    }
};

export default Menu;