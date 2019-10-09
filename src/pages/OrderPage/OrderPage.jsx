import React, { Component } from 'react';
import ordersApi from '../../services/orders-api';
//import { Link } from 'react-router-dom';
import './OrderPage.css';
import { privateDecrypt } from 'crypto';


class OrderPage extends Component {
  state = {
    customer_orders: []
  }

  async componentDidMount() {
    const customer_orders = await ordersApi.getAllOrders();
    this.setState({ customer_orders: customer_orders });
  }

  handleDeleteOrder = async (order_id) => {
    console.log(order_id);
    const orderDeleted = await ordersApi.deleteOrder(order_id);
    console.log(orderDeleted);
    this.setState({ customer_orders: orderDeleted });
  }

  render() {
    return (
      <div className="OrderPage container">
        <div className="row">
          {this.state.customer_orders ?
            this.state.customer_orders.map((order, idx) =>
              <div key={idx} className="col-md-4">
                <div className="parent mb-4">
                <button className="deleteButton btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)}><i className="far fa-trash-alt"></i></button>
                 
                  <div className="card" data-toggle="modal" data-target={`.${order.order_num}`}>
                  
                  <div className="card-body mt-3">
                      <h6 className="card-title">{order.restaurant_name}</h6>
                      
                      <h6 className="card-subtitle mb-2 text-muted">{`Total Items:${order.food_items.length}`}</h6>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          
                    </div>
              
                
                </div>
              </div>
                <div className={`modal fade bd-example-modal-lg ${order.order_num}`} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header ">
                        <h5 className="modal-title" id="exampleModalLabel">{order.restaurant_name} <small>Order# {order.order_num}</small></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      {order.food_items.map((food, idx) =>
                        <div key={food.food_id} className="modal-body">
                          {food.name}
                        </div>
                      )}

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
            :
            <h1>You have no orders yet!</h1>

          }
        </div>
      </div>
    );
  }
};

export default OrderPage;