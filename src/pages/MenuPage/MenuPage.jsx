import React, { Component } from 'react';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';

class MenuPage extends Component {
    
    state = {
        customer_orders: [],
        order_foodList: []
    }
    

    async componentDidMount() {

        console.log(this.props.match.params.id);
        const customer_orders = await ordersApi.getAllOrders();
        const order_foodList = await foodsApi.getAllFoods(this.props.match.params.id);
        console.log(order_foodList);
        this.setState({
            customer_orders: customer_orders,
            order_foodList: order_foodList
        });
    }

   

    genRandomOrderNum() {
        return Math.random().toString(36).substring(3);
    }

    handleCreateOrder = async ()  => {
        console.log(this.props.restaurant.id);
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
        
        this.setState({customer_orders: newOrder});
        this.handleAddFoodItem();
        

    }

    handleAddFoodItem = () => {
        console.log('add item to cart');

        // if(this.state.customer_orders) {
        //     const foodObj = {
        //         restaurant_id: this.props.restaurant.id,

        //     }
        // } else {

        // }

       

    }


    //check if restaurant already has an order
    hasOrderCreated = () => {
        //check if restaurant.id already exits in arry of order objs
        ///[{restaurant_id}]
       for(var i = 0; i < this.state.customer_orders.length; i++) {
           if(parseInt(this.state.customer_orders[i].restaurant_id) === this.props.restaurant.id) {
              return true;
           } 
           
       }
       return false;
    }

    //check if food-item already exists in restaurant's order
    hasFoodAdded = () => {
        console.log('food already in cart, update quantity');
       
        for(var i = 0; i < this.state.order_foodList.length; i++) {
            console.log(this.state.order_foodList);
            // if(parseInt(this.state.order_foodList[i].food_id) === this.props.restaurant.id) {
                
            // } 
            
        }
        console.log('hi')
        
    }

    increaseQuantity = (food_id, curQuantity) => {
        //increase quantity by 1
        //let quantity = curQuantity + 1
        //const updatedFood = foodApi.updateFood(food_id, quantity);
        //this.setState({order_foodlist})
    }

    decreaseQuantity = (food_id) => {
        //decrease quantity by 1
        //let quantity = curQuantity - 1
        //const updatedFood = foodApi.updateFood(food_id, quantity);
        //this.setState({order_foodlist})
    }
    
    
    render() {
        const menu = this.props.restaurant ? 
            <div className="row">
                <div className="col-md-2">
                    <MenuSidebar location={this.props.location} menus={this.props.restaurant.menus} />
                    
                </div>
                <div className="col-md-10">
                {this.props.restaurant.menus.map((menu, idx) => 
                    <div key={idx}>
                    <Menu 
                        categories={menu.categories}
                        restaurant={this.props.restaurant}
                        handleAddToOrderBtn={this.state.customer_orders && this.hasOrderCreated() ? this.handleAddFoodItem : this.handleCreateOrder}
                    />
                    <div>{this.hasFoodAdded()}</div>
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