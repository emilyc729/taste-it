import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import customerService from '../../utils/customerService';

class SignupForm extends Component {

  state = {
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.signup(this.state);
       // Let <App> know a user has signed up!
       this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid customer data (probably duplicate email)
      console.log(err);
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
        <header className="header">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Username" value={this.state.username} name="username" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Phone Number" pattern="[0-9]{10}" value={this.state.phone} name="phone" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center d-flex justify-content-around">
              <button className="btn btn-outline-primary" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/' className="btn btn-outline-danger">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;