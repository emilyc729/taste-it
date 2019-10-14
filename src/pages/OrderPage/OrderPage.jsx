import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';
import Order from '../../components/Order/Order';

import './OrderPage.css';



class OrderPage extends Component {
  state = {
    quantity: 0,
    customer_orders: [],
    condition: false,

  }

  async componentDidMount() {
    const customer_orders = await ordersApi.getAllOrders();
    this.setState({
      customer_orders: customer_orders,
    });
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

  deleteFood = async (food_id, orderIdx) => {
    console.log(food_id);
    const obj = {
      orderIdx: orderIdx,
    }
    const orderList = this.state.customer_orders;

    const foodListCopy = this.state.customer_orders[orderIdx].food_items;
    const deletedFood = await foodsApi.deleteFood(food_id, obj);
    console.log(deletedFood);
    const updatedFoodlist = foodListCopy.filter((foodObj) => {
      return foodObj.food_id !== deletedFood[0].food_id;
    });
    orderList[orderIdx].food_items = updatedFoodlist;

    this.setState({ customer_orders: orderList });
  }

  getTotalItems = (order) => {
    let total_items = 0;
    order.food_items.forEach((food) => {
      total_items += food.quantity;
    });
    console.log(total_items);
    return total_items;
  }

  getSubtotalPrice = (order) => {
    let subtotal = 0;
    order.food_items.forEach((food) => {
      subtotal += (food.price * food.quantity);
    });
    return subtotal.toFixed(2);
  }

  getGrandTotal = (order) => {
    let grand_total = 0;
    order.food_items.forEach((food) => {
      grand_total += (food.price * food.quantity * 1.085);
    });
    return grand_total.toFixed(2);
  }

  saveOrder = async (order_id, order, orderIdx) => {
    const orderList = this.state.customer_orders;
    const obj = {
      total_price: this.getGrandTotal(order),
      total_items: this.getTotalItems(order)
    }

    const updatedOrder = await ordersApi.updateOrder(order_id, obj);
    orderList[orderIdx] = updatedOrder;

    this.setState({ customer_orders: orderList });
    console.log(this.state.customer_orders);

  }


  increaseQuantity = async (order, orderIdx, food_id, curQuantity) => {
    //increase quantity by 1
    let orderList = this.state.customer_orders;
    let obj = {
      quantity: curQuantity + 1
    }
    const updatedFood = await foodsApi.updateFood(food_id, obj);
    orderList[orderIdx].food_items = updatedFood;
    this.setState({customer_orders: orderList});
    this.saveOrder(order._id, order, orderIdx);
  }

  decreaseQuantity = async (order, orderIdx, food_id, curQuantity) => {
    //decrease quantity by 1
    let orderList = this.state.customer_orders;
    if(curQuantity > 1) curQuantity--;
    let obj = {
      quantity: curQuantity
    }
    const updatedFood = await foodsApi.updateFood(food_id, obj);
    orderList[orderIdx].food_items = updatedFood;
    this.setState({customer_orders: orderList});
    this.saveOrder(order._id, order, orderIdx);
  }

  render() {

    return (
      <div className="OrderPage container">

        {this.state.customer_orders ?
          <div>
            <h1 className="text-center">Your Orders</h1>
            <ul className="nav nav-pills mb-3 orderList">
              {this.state.customer_orders.map((order, idx) =>

                <li key={idx} className="nav-item parent">

                  <NavLink activeClassName="active" to={`/orders/${order.restaurant_id}`} className={`nav-link linkBtn`}>
                    {`${order.restaurant_name} Order`}
                  </NavLink>
                </li>

              )}
            </ul>
            <Route exact path="/orders/:id" render={(props) => {
              return (
                <div className="OrderContent container">
                  {this.state.customer_orders ?
                    this.state.customer_orders.map((order, orderIdx) =>
                      <div key={`${order.restaurant_name}${orderIdx}`}>
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
                                  <Order 
                                    key={food._id} 
                                    food={food} idx={idx} 
                                    orderIdx={orderIdx} 
                                    order={order}
                                    deleteFood={this.deleteFood}
                                    increaseQuantity={this.increaseQuantity}
                                    decreaseQuantity={this.decreaseQuantity}
                                  />
                                )}
                                <tr>
                                  <td>SubTotal</td>
                                  <td></td>
                                  <td>{this.getTotalItems(order)}</td>
                                  <td></td>
                                  <td>${this.getSubtotalPrice(order)}</td>
                                  <td></td>
                                </tr>
                                <tr className="no-border">
                                  <td>Tax</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>8.5%</td>
                                  <td></td>
                                </tr>
                                <tr className="no-border">
                                  <td>Total</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>${this.getGrandTotal(order)}</td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                            <button className="btn btn-outline-success" onClick={() => this.saveOrder(order._id, order, orderIdx)}>Submit Order</button>
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
              )
            }
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