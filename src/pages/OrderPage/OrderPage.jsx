import React, { Component } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';
import Order from '../../components/Order/Order';

import './OrderPage.css';



class OrderPage extends Component {
  state = {
    quantity: 0,
    customer_orders: [],

  }

  async componentDidMount() {
    const customer_orders = await ordersApi.getAllOrders();
    this.setState({
      customer_orders: customer_orders,
    });
  }

  //delete order
  handleDeleteOrder = async (order_id) => {
    console.log(order_id);
    const orderDeleted = await ordersApi.deleteOrder(order_id);
    console.log(orderDeleted);
    this.setState({ customer_orders: orderDeleted });
  }

  //delete food from order
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

  //get total items in order
  getTotalItems = (order) => {
    let total_items = 0;
    order.food_items.forEach((food) => {
      total_items += food.quantity;
    });
    console.log(total_items);
    return total_items;
  }

  //get order's subtotal
  getSubtotalPrice = (order) => {
    let subtotal = 0;
    order.food_items.forEach((food) => {
      subtotal += (food.price * food.quantity);
    });
    return subtotal.toFixed(2);
  }

   //get order's grand total
  getGrandTotal = (order) => {
    let grand_total = 0;
    order.food_items.forEach((food) => {
      grand_total += (food.price * food.quantity * 1.085);
    });
    return grand_total.toFixed(2);
  }

  //submit order/send order
  submitOrder = async (order_id, order, orderIdx) => {
    const orderList = this.state.customer_orders;
    const obj = {
      total_price: this.getGrandTotal(order),
      total_items: this.getTotalItems(order)
    }

    const updatedOrder = await ordersApi.updateOrder(order_id, obj);
    orderList[orderIdx] = updatedOrder;

    this.setState({ customer_orders: orderList });
    console.log(this.state.customer_orders[orderIdx]);

  }

  //update increase specific food quantity in order
  increaseQuantity = async (order, orderIdx, food_id, curQuantity) => {
    //increase quantity by 1
    let orderList = this.state.customer_orders;
    let obj = {
      quantity: curQuantity + 1
    }
    const updatedFood = await foodsApi.updateFood(food_id, obj);
    orderList[orderIdx].food_items = updatedFood;
    this.setState({ customer_orders: orderList });
    this.saveOrder(order._id, order, orderIdx);
  }

   //update decrease specific food quantity in order
  decreaseQuantity = async (order, orderIdx, food_id, curQuantity) => {
    //decrease quantity by 1
    let orderList = this.state.customer_orders;
    if (curQuantity > 1) curQuantity--;
    let obj = {
      quantity: curQuantity
    }
    const updatedFood = await foodsApi.updateFood(food_id, obj);
    orderList[orderIdx].food_items = updatedFood;
    this.setState({ customer_orders: orderList });
    this.saveOrder(order._id, order, orderIdx);
  }

  render() {

    return (
      <div className="OrderPage container">
        <h1 className="text-center">Your Orders</h1>
        {/* {this.state.customer_orders ?
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
                  <div className="row">
                    {this.state.customer_orders ?
                      this.state.customer_orders.map((order, orderIdx) =>
                        <div key={`${order.restaurant_name}${orderIdx}`}>
                          {order.restaurant_id === props.match.params.id ?
                            <div>
                              <Link className="OrderPage-name" to={`/restaurant/${order.restaurant_id}/${order.restaurantIdx}`}>{order.restaurant_name}</Link>
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
                                    <td>SF Tax</td>
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
                </div>
              )
            }
            } />
          </div>
          :
          <div>Loading...</div>
        } */}
        <div className="row">

          {this.state.customer_orders ?

            this.state.customer_orders.map((order, orderIdx) =>


              <div key={order.order_num} className="col-sm-12 col-md-4 mt-3">
                <div className="parent mb-4">
                  <button className="deleteButton btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)}><i className="fas fa-times"></i></button>

                  <div className="card" data-toggle="modal" data-target={`.${order.name}${order.order_num}`}>
                    <div className="card-body">
                      <h6 className="card-title">{order.restaurant_name} Order</h6>
                    </div>
                  </div>
                </div>

                <div className={`modal fade ${order.name}${order.order_num}`} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">

                        <h5 className="modal-title">{order.restaurant_name} <small className="OrderPage-order-num">Order# {order.order_num}</small></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>


                      <div className="modal-body table-responsive-sm">
                        <table className="table table-hover table-sm">
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

                          </tbody>
                        </table>
                        <table className="table table-borderless table-sm col-lg-3 OrderPage-sm-table">

                          <tbody>

                            <tr>
                              <th scope="row">Total Items</th>
                              <td>{this.getTotalItems(order)}</td>
                            </tr>
                            <tr>
                              <th scope="row">Subtotal</th>
                              <td>${this.getSubtotalPrice(order)}</td>
                            </tr>
                            <tr>
                              <th scope="row">SF Tax</th>
                              <td>8.5%</td>

                            </tr>
                            <tr>
                              <th scope="row">Total</th>
                              <td>${this.getGrandTotal(order)}</td>

                            </tr>
                          </tbody>
                        </table>
                      </div>


                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.submitOrder(order._id, order, orderIdx)}>Submit Order</button>
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