import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title : '',
      description: '',
      website: '',
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  BackButton(){
    const history = useHistory();

    function backToHome() {
      history.push("/");
    }
    
    return (
        <Button id="backButton" type="button" onClick={backToHome}>
            Back
        </Button>
    )
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/credential', {
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
        this.setState({message: 'Error on creating credentials'});
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error on creating credentials');
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Add new credential</h1>
        <this.BackButton />
        <form onSubmit={this.onSubmit}>
          { this.state.message !== '' && <h3 className="error"> { this.state.message } </h3> }
          <label htmlFor="title"><b>Title</b></label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="description"><b>Title</b></label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <label htmlFor="website"><b>Website</b></label>
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={this.state.website}
            onChange={this.handleInputChange}
          />
          <label htmlFor="username"><b>Username</b></label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <label htmlFor="password"><b>Password</b></label>
          <input
            type="text"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input id="loginButton" type="submit" value="Create"/>
        </form>
      </div>
    );
  }
}