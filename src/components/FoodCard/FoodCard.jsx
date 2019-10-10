import React, { Component } from 'react';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';
import './FoodCard.css';


class FoodCard extends Component {
    state = {
        quantity: 0,
        customer_orders: [],
        order_foodList: []
    }
    
    async componentDidMount() {

        console.log(this.props.match.params.id);
        const customer_orders = await ordersApi.getAllOrders();
        const order_foodList = await foodsApi.getAllFoods(this.props.match.params.id);
        this.setState({
            customer_orders: customer_orders,
            order_foodList: order_foodList
        });
    }

    //generate 10digit random order#
    genRandomOrderNum() {
        return Math.random().toString(36).substring(3);
    }

    handleCreateOrder = async ()  => {

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

    createOrderOrAddItem = () => {
        if(this.state.customer_orders && this.hasOrderCreated()) {
            if(this.hasFoodAdded()) {
                console.log('update food quantity');
            } else {
                return this.handleAddFoodItem();
            }
        } else {
            return this.handleCreateOrder();
        }
    }

    handleAddFoodItem = async () => {
        console.log('added food to order');
        const foodObj = {
            restaurant_id: this.props.restaurant.id,
            food_id: this.props.food.id,
            name: this.props.food.name,
            price: this.props.food.price,
            quantity: this.state.quantity
        }

        const addedFoods = await foodsApi.createFood(this.props.restaurant.id, foodObj);
        console.log(addedFoods);
        this.setState({order_foodList: addedFoods});

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
        console.log(this.state.order_foodList);
        for(var i = 0; i < this.state.order_foodList.length; i++) {
            if(parseInt(this.state.order_foodList[i].food_id) === this.props.food.id) {
                console.log('true');
                return true;
            } 
            
        }
        console.log('false');
        return false;
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
        return (
            <div key={this.props.food.name} className="col-md-6 col-lg-4">
                <div className="card bg-dark mt-4">
                    <img src={this.props.food.food_photo} className="card-img-top" alt={this.props.food.description} />
                    <div className="card-body bg-light">
                        <h5 className="card-title d-flex justify-content-between">
                            <span>{this.props.food.name}</span>
                            <span>${this.props.food.price}</span>
                        </h5>
                        <div className="card-text text-center d-flex justify-content-around">
                            <form>
                                <button className="btn"><i className="far fa-minus-square"></i></button>
                                <input className="quantity" type="number" name="quantity" defaultValue={this.state.value}></input>
                                <button className="btn"><i className="far fa-plus-square"></i></button>
                            </form>
                            <button className="btn btn-outline-primary btn-sm"
                                onClick={() => this.createOrderOrAddItem()}>Add to Order</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default FoodCard;