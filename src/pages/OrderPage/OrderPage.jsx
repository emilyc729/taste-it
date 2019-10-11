import React, { Component } from 'react';
import {Route, Link, NavLink} from 'react-router-dom';
import ordersApi from '../../services/orders-api';
import Order from '../../components/Order/Order';

import './OrderPage.css';



class OrderPage extends Component {
  state = {
    quantity: 0,
    customer_orders: [],
    order_foodlist: [],
    condition: false,

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


  handleClick = (e) => {

    console.log('The link was clicked.');
    console.log(e);
    this.setState({
      condition: true
    })
  };

  render() {

    return (
      <div className="OrderPage container">

        {this.state.customer_orders ?
          <div>
            <h1 className="text-center">Your Orders</h1>
            <ul className="nav nav-pills mb-3 orderList">
            {this.state.customer_orders.map((order, idx) => 
  
              <li key={idx} className="nav-item parent">
                
                <NavLink activeClassName="active" to={`/orders/${order.restaurant_id}`} className={`nav-link`}>
                  {`${order.restaurant_name} Order`} 
                </NavLink>
              </li>
            
          )}
          </ul>
          <Route path="/orders/:id" render={(props) => {
            return (
            <div className="OrderContent">
              
              {this.state.customer_orders ?
                this.state.customer_orders.map((order, idx) =>
                <div key={`${order.restaurant_name}${idx}`}>
                  {order.restaurant_id === props.match.params.id ? 
                    <div>
                      <h3>Order#: {order.order_num}</h3>
                      <button className="deleteBtn btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)}>Delete Order</button>
                      <table className="table table-hover mt-4">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Item</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Price</th>
                              <th scope="col">Total</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                        {order.food_items.map((food, idx) =>
                                <Order key={food._id} food={food} idx={idx} />
                        )}
                                   </tbody>
                        </table>
                    </div>
                    :
                    ''
                  }
                  
                </div>
                )
                :
                <div>Loading...</div>
              }
       
            </div>
            )}
          } />
          </div>
          :
          <div>Loading...</div>
        }
        <div className="row">

          {/* {this.state.customer_orders ?

            this.state.customer_orders.map((order, orderIdx) =>


              <div key={order.order_num} className="col-md-4 mt-3">
                <div className="parent mb-4">
                  <button className="deleteButton btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)}><i className="fas fa-times"></i></button>

                  <div className="card" data-toggle="modal" data-target={`.${order.name}${order.order_num}`}>

                    <div className="card-body">
                      <h6 className="card-title">{order.restaurant_name} Order</h6>

                    </div>


                  </div>
                </div>
                <div className={`modal fade bd-example-modal-lg ${order.name}${order.order_num}`} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl" role="document">
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
                              <th scope="col">Total</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.food_items.map((food, idx) =>
                              <Order key={food._id} food={food} idx={idx} />
                              // <tr key={`${food.name}${idx}`}>
                              //   <th scope="row">{idx + 1}</th>
                              //   <td>{food.name}</td>
                              //   <td>
                              //     <div>
                              //       <button className="btn" onClick={() => this.decrement()}><i className="far fa-minus-square"></i></button>
                              //       <input className="quantity" type="number" name={`quantity${food.id}`} value={food.quantity} onClick={this.handleChange} />
                              //       <button className="btn" onClick={() => this.increment(food.restaurant_id, food._id, food.quantity)}><i className="far fa-plus-square"></i></button>
                              //     </div>
                              //   </td>
                              //   <td>{food.price}</td>
                              //   <td><i className="deleteFood far fa-trash-alt" onClick={() => this.deleteFood(food._id)}></i></td>
                              // </tr>
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

          } */}
        </div>
      </div>
    );
  }
};

export default OrderPage;