import React, { Component } from 'react';

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
    <div key={"cred-" + cred.id} className="card border-primary mb-3">
     <div className="card-block">
        <div className="card-title">{cred.title}</div>
        <div className="card-subtitle mb-2 text-muted">{cred.website}</div>
      </div>
    </div>
    );
    return (
      <div>{listItems}</div>
    );
  }
  
  render() {
    return (
    <div className="container-fluid">
      <div id="first-half">
          <this.DisplayCredentials credentials={this.state.credentials} />
      </div>
      <div id="second-half"> 
        <h2>Selected</h2>
        <p>Some text here too.</p>
      </div>
    </div>
    );
  }
}