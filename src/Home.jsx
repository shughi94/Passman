import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      credentials: []
    }
  }
  
  componentDidMount() {
    fetch('/credentials',{
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => {
        this.setState(data);
        console.log(data);
      });
  }

  DisplayCredentials(props) {
    const credentials = props.credentials;
    const listItems = credentials.map((cred) =>
    <div key={"cred-" + cred.id} className="panel panel-default">
      <div className="panel-heading">{cred.title}</div>
      <div className="panel-body">{cred.website}</div>
    </div>
    );
    return (
      <div>{listItems}</div>
    );
  }
  
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.state.message}</p>
        <this.DisplayCredentials credentials={this.state.credentials} />
      </div>
    );
  }
}