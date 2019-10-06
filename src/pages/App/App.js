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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar 
            customer={this.state.customer}
          />
        </header>

        <Switch>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}

            />
          } />
          <Route exact path='/login' render={() =>
            <LoginPage

            />
          } />

        </Switch>
      </div>
    );
  }
}

export default App;
