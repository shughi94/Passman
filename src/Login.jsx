import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: '',
      message: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        this.setState({message: 'Login failed'});
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        { this.state.message !== '' && <h3 className="error"> { this.state.message } </h3> }
        <input
          type="username"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}