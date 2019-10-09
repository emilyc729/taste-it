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


  render() {
    return (
      <div className="OrderPage container">
        <div className="row">
        {this.state.customer_orders ? 
          this.state.customer_orders.map((order, idx) =>
            <div key={idx} className="col-md-4">
              <div className="card" data-toggle="modal" data-target={`.${order.order_num}`}>
                <p>{order.restaurant_name}</p>
                <button>Delete Order</button>
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