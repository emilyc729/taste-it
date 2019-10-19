import React, { Component } from 'react';
import './Order.css';


class Order extends Component {

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return (
            <tr>
                <th scope="row">{this.props.idx + 1}</th>
                <td>{this.props.food.name}</td>
                <td>
                    <div>
                        <button className="btn Order-btn" onClick={() => this.props.decreaseQuantity(this.props.order, this.props.orderIdx, this.props.food._id, this.props.food.quantity)}><i className="far fa-minus-square"></i></button>
                        <input className="quantity" type="number" name={`quantity${this.props.food._id}`} value={this.props.food.quantity} onChange={this.handleChange} />
                        <button className="btn Order-btn" onClick={() => this.props.increaseQuantity(this.props.order, this.props.orderIdx, this.props.food._id, this.props.food.quantity)}><i className="far fa-plus-square"></i></button>
                    </div>
                </td>
                <td>${this.props.food.price}</td>
                <td>${(this.props.food.price * this.props.food.quantity).toFixed(2)}</td>
                <td><i className="deleteFood btn far fa-trash-alt" onClick={() => this.props.deleteFood(this.props.food._id, this.props.orderIdx)}></i></td>
            </tr>

        );
    }
};

export default Order;