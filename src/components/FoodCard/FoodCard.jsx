import React, { Component } from 'react';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';
import './FoodCard.css';


class FoodCard extends Component {
    state = {
        quantity: 1,
    }

    increment = () => {
        //console.log('hi');
        let addOne = this.state.quantity;
        if(addOne < 15) addOne++;
        this.setState({quantity: addOne});
        //console.log(this.state.quantity);
    }

    decrement = () => {
        let minusOne = this.state.quantity;
        if(minusOne > 1) minusOne--;
        this.setState({quantity: minusOne});
        //console.log(this.state.quantity);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    render() {
        return (
            <div key={this.props.food.name} className="col-md-6 col-lg-4">
                <div className="card mt-4">
                    <img src={this.props.food.food_photo} className="card-img-top" alt={this.props.food.description} />
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                            <span>{this.props.food.name}</span>
                            <span>${this.props.food.price}</span>
                        </h5>
                        {this.props.customer ? 
                            <div className="card-text text-center d-flex justify-content-around">
                                <div>
                                    <button className="btn numBtn" onClick={() => this.decrement()}><i className="far fa-minus-square"></i></button>
                                    <input className="quantity" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                                    <button className="btn numBtn" onClick={() => this.increment()}><i className="far fa-plus-square"></i></button>
                                </div>
                                <button className="btn-outline-primary btn-sm addOrderBtn"
                                    onClick={() => this.props.createOrderOrAddItem(this.props.food, this.state.quantity)}>Add to Order</button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default FoodCard;