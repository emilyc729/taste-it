import React, {Component} from 'react';
import './Menu.css';
import FoodCard from '../FoodCard/FoodCard';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';

class Menu extends Component {
    // state = {
    //     customer_orders: [],
    //     order_foodList: [],
    //     isFetching: false
    // }
    
    // async componentDidMount() {

    //     console.log(this.props.match.params.id);
    //     const customer_orders = await ordersApi.getAllOrders();
    //     const order_foodList = await foodsApi.getAllFoods(this.props.match.params.id);
    //     this.setState({
    //         customer_orders: customer_orders,
    //         order_foodList: order_foodList
    //     });
    // }

    // //generate 10digit random order#
    // genRandomOrderNum() {
    //     return Math.random().toString(36).substring(3);
    // }

    // //create order for restaurant
    // handleCreateOrder = async (food, quantity)  => {
    //     console.log('order created');
    //     const orderObj = {
    //         restaurant_name: this.props.restaurant.name,
    //         restaurant_id: this.props.restaurant.id,
    //         restaurantIdx: this.props.restaurantIdx,
    //         order_num: this.genRandomOrderNum(),
    //         total_items: quantity,
    //         total_price: (food.price * quantity),
    //         food_items: []
    //     }
    //     //this.state.isFetching = true;
    //     const newOrder = await ordersApi.createOrder(orderObj);
    //    // this.state.isFetching = false;
    //     console.log(newOrder);
    
    //     this.setState({customer_orders: newOrder});
    //     console.log(this.state.customer_orders);
    //     this.handleAddFoodItem(food, quantity);
    
        

    // }

    // //create food item and add to pertaining restaurant order
    // handleAddFoodItem = async (food, quantity) => {
    //     console.log(food);
    //     console.log('added food to order');
    //     const foodObj = {
    //         restaurant_id: this.props.restaurant.id,
    //         food_id: food.id,
    //         name: food.name,
    //         price: food.price,
    //         quantity: quantity
    //     }
    //     this.state.isFetching = true;
    //     const addedFoods = await foodsApi.createFood(this.props.restaurant.id, foodObj);
    //     this.state.isFetching = false;
    //     console.log(addedFoods);
    //     this.setState({order_foodList: addedFoods});
    // }


    // //check if restaurant already has an order
    // hasOrderCreated = () => {
    //     //check if restaurant.id already exits in arry of order objs
    //     ///[{restaurant_id}]
    //    for(var i = 0; i < this.state.customer_orders.length; i++) {
    //        if(parseInt(this.state.customer_orders[i].restaurant_id) === this.props.restaurant.id) {
    //            console.log('Order true');
    //           return true;
    //        } 
           
    //    }
    //    console.log('order false');
    //    return false;
    // }

    // //check if food-item already exists in restaurant's order
    // hasFoodAdded = (food) => {
    //     console.log(this.state.order_foodList);
    //     console.log(food.id);
    //     for(var i = 0; i < this.state.order_foodList.length; i++) {
    //         console.log(this.state.order_foodList[i].food_id);
    //         if(parseInt(this.state.order_foodList[i].food_id) === food.id) {
    //             console.log('food true');
    //             return true;
    //         } 
            
    //     }
    //     console.log('food false');
    //     return false;
    // }

    // updateQuantityOnFoodAdd = async (food, quantity) => {

    //     let savedQuantity = 0;
    //     let curQuantity = quantity;
    //     let total = 0;
    //     for(var i = 0; i < this.state.order_foodList.length; i++) {
    //         if(parseInt(this.state.order_foodList[i].food_id) === food.id) {
    //             savedQuantity = this.state.order_foodList[i].quantity;
    //             total = savedQuantity + curQuantity;
    //             console.log(total);
    //             const updateQuantity = {
    //                 quantity: total
    //             }
    //             const updatedFood = await foodsApi.updateFood(this.state.order_foodList[i]._id, updateQuantity);
    //             console.log(updatedFood);
    //             this.setState({order_foodList: updatedFood});
    //         } 
    //     }
    // }

   

    //  //'add to order' btn function
    //  createOrderOrAddItem = (food, quantity) => {
    //     if(this.state.customer_orders && this.hasOrderCreated()) {
    //         if(this.hasFoodAdded(food)) {
    //             console.log('update food quantity');
    //             return this.updateQuantityOnFoodAdd(food, quantity);
    //         } else {
    //             if(!this.state.isFetching) {
    //                 return this.handleAddFoodItem(food, quantity);
    //             }
    //         }
         
    //     } else {
    //         //if(!this.state.isFetching) {
    //             return this.handleCreateOrder(food, quantity);
    //         //}
    //     }
    // }

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
                                createOrderOrAddItem={this.props.createOrderOrAddItem}
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