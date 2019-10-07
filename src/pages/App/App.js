import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import customerService from '../../utils/customerService';
import menuApi from '../../services/menus-api';


class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant_menus: [],
      // Initialize user if there's a token, otherwise null
      customer: customerService.getCustomer()
    };
  }

  async componentDidMount() {
    const restaurant_menus = await menuApi.getAllMenus();
    console.log(restaurant_menus);
    this.setState({restaurant_menus: restaurant_menus.result});
  }

  handleSignupOrLogin = () => {
    this.setState({customer: customerService.getCustomer()});
  }

  handleLogout = () => {
    customerService.logout();
    this.setState({customer: null});
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
            <section>
              {this.state.restaurant_menus.map((restaurant, idx) =>
                  <p>{idx}</p>
                  <p>{restaurant.name}</p>
              )}
            
            </section>
          }/>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({history}) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

        </Switch>
      </div>
    );
  }
}

export default App;
