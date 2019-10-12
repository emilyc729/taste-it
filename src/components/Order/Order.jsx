import React, { Component } from 'react';
import foodsApi from '../../services/foods-api';
//import { Link } from 'react-router-dom';
import './Order.css';


class Order extends Component {
    state = {
        quantity: this.props.food.quantity,
        //order_foodlist: []

    }

    // async componentDidMount() {
    //     const order_foodlist = await foodsApi.getAllFoods(this.props.food.restaurant_id);
    //     this.setState({order_foodlist: order_foodlist});
    // }

    increaseQuantity = (food_id, curQuantity) => {
        //increase quantity by 1
        //let quantity = curQuantity + 1
        //const updatedFood = foodApi.updateFood(food_id, quantity);
        //this.setState({order_foodlist: updateFood})
    }

    decreaseQuantity = (food_id) => {
        //decrease quantity by 1
        //let quantity = curQuantity - 1
        //const updatedFood = foodApi.updateFood(food_id, quantity);
        //this.setState({order_foodlist: updateFood})
    }



    increment = async () => {
        let addOne = this.state.quantity;
        addOne++;
        this.setState({quantity: addOne});
        // const updateQuantity = {
        //     quantity: addOne
        // }
        //const updatedFood = await foodsApi.updateFood(unique_foodId, updateQuantity);
        //console.log(updatedFood);
        //this.setState({ order_foodlist: updatedFood });
        //console.log(this.state.order_foodlist);
    }



    decrement = () => {
        let minusOne = this.state.quantity;
        if (minusOne > 1) minusOne--;
        this.setState({ quantity: minusOne });
        //console.log(this.state.quantity);
    }

    handleChange = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // deleteFood = async () => {
    //     console.log('hi');
    //     const obj = {
    //         orderIdx: this.props.orderIdx,
    //         foodIdx: this.props.idx
    //     }
    //     const foodListCopy = this.state.order_foodlist;
    //     const deletedFood = await foodsApi.deleteFood(this.props.food._id, obj);
    //     console.log(deletedFood);
    //     const updatedFoodlist = foodListCopy.filter((foodObj) => {
    //         return foodObj.food_id !== deletedFood[0].food_id;
    //     }) ;
    //     console.log(updatedFoodlist);
    //     console.log(this.state);
    //     this.setState({order_foodlist: updatedFoodlist});
        
    // }

    render() {

        return (
            <tr>
                <th scope="row">{this.props.idx + 1}</th>
                <td>{this.props.food.name}</td>
                <td>
                    <div>
                        <button className="btn" onClick={() => this.decrement()}><i className="far fa-minus-square"></i></button>
                        <input className="quantity" type="number" name={`quantity${this.props.food.id}`} value={this.state.quantity} onChange={this.handleChange} />
                        <button className="btn" onClick={() => this.increment()}><i className="far fa-plus-square"></i></button>
                    </div>
                </td>
                <td>${this.props.food.price}</td>
                <td>${(this.props.food.price * this.state.quantity).toFixed(2)}</td>
                <td><i className="deleteFood btn far fa-trash-alt" onClick={() => this.props.deleteFood(this.props.food._id, this.props.orderIdx)}></i></td>
            </tr>

        );
    }
};

export default Order;