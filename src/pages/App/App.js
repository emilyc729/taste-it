import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';
import customerService from '../../utils/customerService';


class App extends Component {
  constructor() {
    super();
    this.state = {
      // Initialize user if there's a token, otherwise null
      customer: customerService.getCustomer()
    };
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
