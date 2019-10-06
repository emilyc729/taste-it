import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import NavBar from '../../components/NavBar/NavBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>

        <Switch>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              
            />
          }/>
          <Route exact path='/login' render={() => 
            <LoginPage
              
            />
          }/>
      
        </Switch>
      </div>
    );
  }
}

export default App;
