import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import customerService from '../../utils/customerService';
import menuApi from '../../services/menus-api';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import MenuPage from '../MenuPage/MenuPage';
import OrderPage from  '../OrderPage/OrderPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant_menus: [],
      customer: customerService.getCustomer()
    };
  }

  async componentDidMount() {
    const restaurant_menus = await menuApi.getAllMenus();
    this.setState({ 
      restaurant_menus: restaurant_menus.result ,
      //customer_orders: orders
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
                {this.state.restaurant_menus ? 
                  this.state.restaurant_menus.map((restaurant, idx) =>
                    <div key={idx} className="col-md-4">
                      <RestaurantCard restaurant={restaurant} idx={idx} />
                    </div>
                  )
                  :
                  <section>Loading...</section>
                }
              </div>
            </section>
          } />
          <Route exact path='/restaurant/:id/:idx' render={(props) => {
            let restaurant = this.state.restaurant_menus[props.match.params.idx];
            return <MenuPage
              {...props}
              restaurant={restaurant}
              customer={this.state.customer}
            />
          }
          } />
          <Route exact path='/orders' render={(props) => {
            return <OrderPage
              {...props}
              restaurant_menus={this.state.restaurant_menus}
            />
          }
          } />
          <Route exact path="/orders/:id" component={OrderPage} />
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
        <footer className="footer">
          Taste-It  <i className="far fa-grin-wink"></i>
        </footer>
      </div>
    );
  }
}

export default App;
