import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import customerService from '../../utils/customerService';
import menuApi from '../../services/menus-api';
import ordersApi from '../../services/orders-api';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import MenuPage from '../MenuPage/MenuPage';
import OrderPage from  '../OrderPage/OrderPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant_menus: [],
      // Initialize user if there's a token, otherwise null
      customer_orders: [],
      customer: customerService.getCustomer()
    };
  }

  async componentDidMount() {
    const restaurant_menus = await menuApi.getAllMenus();
    const orders = await ordersApi.getAllOrders();
    console.log(orders);
    console.log(restaurant_menus.result);
    this.setState({ 
      restaurant_menus: restaurant_menus.result ,
      customer_orders: orders
    });
  }

  handleSignupOrLogin = () => {
    this.setState({ customer: customerService.getCustomer() });
  }

  handleLogout = () => {
    customerService.logout();
    this.setState({ customer: null });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            customer={this.state.customer}
            handleLogout={this.handleLogout}
          />
        </header>

        <Switch>
          <Route exact path='/' render={() =>
            <section className="container">
              <div className="row">
                {this.state.restaurant_menus.map((restaurant, idx) =>
                  <div key={idx} className="col-md-4">
                    <RestaurantCard info={restaurant} idx={idx} />
                  </div>
                )}
              </div>
            </section>
          } />
          <Route exact path='/restaurant/:id' render={(props) => {
            let restaurant = this.state.restaurant_menus[props.match.params.id];
            return <MenuPage
              {...props}
              restaurant={restaurant}
            />
          }
          } />
          <Route exact path='/orders' render={(props) => {
            return <OrderPage
              {...props}
              orders={this.state.customer.orders}
            />
          }
          } />
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

        </Switch>
        <footer className="footer bg-light">
          Taste-It  <i className="far fa-grin-wink"></i>
        </footer>
      </div>
    );
  }
}

export default App;
