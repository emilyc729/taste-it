import React, { Component } from 'react';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';
import ordersApi from '../../services/orders-api';

class MenuPage extends Component {
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
    hasOrderCreated() {
       
    }

    
    

    
    render() {
        const menu = this.props.restaurant ? 
        <div className="row">
            <div className="col-md-2">
                <MenuSidebar menus={this.props.restaurant.menus} />
            </div>
            <div className="col-md-10">
            {this.props.restaurant.menus.map((menu, idx) => 
                <div key={idx}>
                <Menu 
                    categories={menu.categories}
                    customer_orders={this.state.customer_orders}
                    restaurant={this.props.restaurant}
                    handleAddToOrderBtn={
                        this.state.customer_orders ? this.handleAddFoodItem : this.handleCreateOrder
                    }
                />
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
    }
};

export default MenuPage;