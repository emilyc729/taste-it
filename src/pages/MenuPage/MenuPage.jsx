import React, { Component } from 'react';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';

class MenuPage extends Component {
    state = {
        categorySelected: '',
        customer_orders: [],
        order_foodList: [],
        isFetching: false
    }

    async componentDidMount() {
        if(this.props.customer) {
            const customer_orders = await ordersApi.getAllOrders();
            const order_foodList = await foodsApi.getAllFoods(this.props.match.params.id);
            this.setState({
                customer_orders: customer_orders,
                order_foodList: order_foodList
            });
        }
    }

    //generate 10digit random order#
    genRandomOrderNum() {
        return Math.random().toString(36).substring(3);
    }

    //create order for restaurant
    handleCreateOrder = async (food, quantity)  => {
        console.log('order created');
        const orderObj = {
            customer_name: this.props.customer.name,
            email: this.props.customer.email,
            phone: this.props.customer.phone,
            restaurant_name: this.props.restaurant.name,
            restaurant_id: this.props.restaurant.id,
            restaurantIdx: this.props.match.params.idx,
            order_num: this.genRandomOrderNum(),
            total_items: quantity,
            total_price: (food.price * quantity),
            food_items: []
        }
 
        const newOrder = await ordersApi.createOrder(orderObj);
    
        this.setState({customer_orders: newOrder});
        this.handleAddFoodItem(food, quantity);
    
    }

    //create food item and add to pertaining restaurant order
    handleAddFoodItem = async (food, quantity) => {
        console.log('added food to order');
        const foodObj = {
            restaurant_id: this.props.restaurant.id,
            food_id: food.id,
            name: food.name,
            price: food.price,
            quantity: quantity
        }
        this.state.isFetching = true;
        const addedFoods = await foodsApi.createFood(this.props.restaurant.id, foodObj);
        this.state.isFetching = false;
        this.setState({order_foodList: addedFoods});
    }


    //check if restaurant already has an order
    hasOrderCreated = () => {
       for(var i = 0; i < this.state.customer_orders.length; i++) {
           if(parseInt(this.state.customer_orders[i].restaurant_id) === this.props.restaurant.id) {
              return true;
           }  
       }
       return false;
    }

    //check if food-item already exists in restaurant's order
    hasFoodAdded = (food) => {
        for(var i = 0; i < this.state.order_foodList.length; i++) {
            if(parseInt(this.state.order_foodList[i].food_id) === food.id) {
                return true;
            }   
        }
        return false;
    }

    //update quantity of food if already in order
    updateQuantityOnFoodAdd = async (food, quantity) => {

        let savedQuantity = 0;
        let curQuantity = quantity;
        let total = 0;
        for(var i = 0; i < this.state.order_foodList.length; i++) {
            if(parseInt(this.state.order_foodList[i].food_id) === food.id) {
                savedQuantity = this.state.order_foodList[i].quantity;
                total = savedQuantity + curQuantity;
                const updateQuantity = {
                    quantity: total
                }
                const updatedFood = await foodsApi.updateFood(this.state.order_foodList[i]._id, updateQuantity);
                this.setState({order_foodList: updatedFood});
            } 
        }
    }

   

     //'add to order' btn function
     createOrderOrAddItem = (food, quantity) => {
        if(this.state.customer_orders && this.hasOrderCreated()) {
            if(this.hasFoodAdded(food)) {
                console.log('update food quantity');
                return this.updateQuantityOnFoodAdd(food, quantity);
            } else {
                if(!this.state.isFetching) {
                    return this.handleAddFoodItem(food, quantity);
                }
            }
         
        } else {
            return this.handleCreateOrder(food, quantity);
        }
    }

    //sidebar anchor relative link
    handleSelection = (category) => {
        this.setState({categorySelected: category});
    }
    
    render() {
        const menu = this.props.restaurant ? 
            <div className="row">
                <div className="col-md-2">
                    <MenuSidebar 
                        location={this.props.location} 
                        menus={this.props.restaurant.menus} 
                        categorySelected={this.state.categorySelected}
                        handleSelection={this.handleSelection}
                    />
                    
                </div>
                <div className="col-md-10">
                {this.props.restaurant.menus.map((menu, idx) => 
                    <div key={idx}>
                    <Menu
                        {...this.props} 
                        categories={menu.categories}
                        customer={this.props.customer}
                        categorySelected={this.state.categorySelected}
                        createOrderOrAddItem={this.createOrderOrAddItem}
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
            <div className="MenuPage container">
            {menu}
            </div>
        );
    }
};

export default MenuPage;