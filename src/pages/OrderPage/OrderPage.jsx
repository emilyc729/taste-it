import React, { Component } from 'react';
import ordersApi from '../../services/orders-api';
//import { Link } from 'react-router-dom';
import './OrderPage.css';


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
              <div key={order.order_num} className="col-md-4">
                <div className="parent mb-4">
                  <button className="deleteButton btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)}><i className="fas fa-times"></i></button>

                  <div className="card" data-toggle="modal" data-target={`.${order.name}${order.order_num}`}>

                    <div className="card-body mt-3">
                      <h6 className="card-title">{order.restaurant_name}</h6>

                      <h6 className="card-subtitle mb-2 text-muted">{`Total Items:${order.food_items.length}`}</h6>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    </div>


                  </div>
                </div>
                <div className={`modal fade bd-example-modal-lg ${order.name}${order.order_num}`} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header ">
                        <h5 className="modal-title" id="exampleModalLabel">{order.restaurant_name} <small>Order# {order.order_num}</small></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      
                        <div className="modal-body">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                            {order.food_items.map((food, idx) =>
                              <tr key={`${food.name}${idx}`}>
                                <th scope="row">{idx+1}</th>
                                <td>{food.name}</td>
                                <td>{food.quantity}</td>
                                <td>{food.price}</td>
                                <td><i className="btn-outline-danger far fa-trash-alt"></i></td>
                              </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      

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