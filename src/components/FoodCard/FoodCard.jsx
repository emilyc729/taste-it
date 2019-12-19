import React, { Component } from 'react';
import './FoodCard.css';


class FoodCard extends Component {
    state = {
        quantity: 1,
    }

    increment = () => {
        let addOne = this.state.quantity;
        if(addOne < 15) addOne++;
        this.setState({quantity: addOne});
    }

    decrement = () => {
        let minusOne = this.state.quantity;
        if(minusOne > 1) minusOne--;
        this.setState({quantity: minusOne});
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
                    <img src={this.props.food.food_photo} className="card-img-top" alt={this.props.food.description} data-toggle="tooltip" data-placement="top" title={this.props.food.description} />
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                            <span>{this.props.food.name}</span>
                            <span>${this.props.food.price}</span>
                        </h5>
                        {this.props.customer ? 
                            <div className="card-text text-center d-flex justify-content-around">
                                <div>
                                    <button className="btn numBtn" onClick={() => this.decrement()}><i className="FoodCard-icons far fa-minus-square"></i></button>
                                    <input className="quantity" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                                    <button className="btn numBtn" onClick={() => this.increment()}><i className="FoodCard-icons far fa-plus-square"></i></button>
                                </div>
                                <button className="btn-outline-primary btn-sm addOrderBtn" data-toggle="modal" data-target={`.addToOrderDialog${this.props.food.id}`}
                                    onClick={() => this.props.createOrderOrAddItem(this.props.food, this.state.quantity)}>Add to Order
                                </button>
                                <div className={`modal fade addToOrderDialog${this.props.food.id}`} tabIndex="-1" role="dialog">
                                <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                        <p>Added {this.state.quantity} {this.props.food.name} to {this.props.restaurant.name} order</p>
                              
                                    </div>
                                </div>
                                </div>
                                

                             
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