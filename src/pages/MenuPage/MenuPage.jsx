import React, { Component } from 'react';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';
import ordersApi from '../../services/orders-api';

class MenuPage extends Component {
    state = {
        customer_orders: this.props.customer.orders
    }

    handleCreateOrder() {
        
        this.setState({});

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
                <Menu categories={menu.categories} />
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