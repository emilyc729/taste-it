import React, { Component } from 'react';
import ordersApi from '../../services/orders-api';
import foodsApi from '../../services/foods-api';
import Order from '../../components/Order/Order';

import './OrderPage.css';



class OrderPage extends Component {
  state = {
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
    const orderDeleted = await ordersApi.deleteOrder(order_id);
    this.setState({ customer_orders: orderDeleted });
  }

  //delete food from order
  deleteFood = async (food_id, orderIdx) => {
    const obj = {
      orderIdx: orderIdx,
    }
    const orderList = this.state.customer_orders;
    const foodListCopy = this.state.customer_orders[orderIdx].food_items;
    const deletedFood = await foodsApi.deleteFood(food_id, obj);
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
    //alert('Your order is saved and submitted');
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
    this.submitOrder(order._id, order, orderIdx);
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
    this.submitOrder(order._id, order, orderIdx);
  }

  render() {

    return (
      <div className="OrderPage container">
        <h1 className="text-center">Your Orders</h1>
        <div className="row">

          {this.state.customer_orders ?

            this.state.customer_orders.map((order, orderIdx) =>


              <div key={order.order_num} className="col-sm-12 col-md-4 mt-3">
                <div className="parent mb-4">
                  <button className="deleteButton btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteOrder(order._id)} data-toggle="tooltip" data-placement="top" title="Delete Order"><i className="fas fa-times"></i></button>
                
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
            <div>
              Loading...
              <h5 className="text-center col-lg-12">You have no orders yet!</h5>
            </div>                   
          }
        </div>
      </div>
    );
  }
};

export default OrderPage;