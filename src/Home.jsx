import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      credentials: [],
      selected: {}
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
      });
  }

  cardClicked(id) {
    console.log('clicked card: '+id);
  }

  DisplayCredentials(props) {
    const credentials = props.credentials;
    const fclick = props.onclick;
    const listItems = credentials.map((cred) =>
    <a key={cred.id} className="credCard" onClick={fclick.bind(this,cred.id)} style={{ cursor: "pointer" }}>
      <Card border="primary" bg="light" >
        <Card.Header>{cred.title}</Card.Header>
        <Card.Body>
          <Card.Text>{cred.website}</Card.Text>
        </Card.Body>
      </Card>
    </a>
    );
    return (
      <div className="credCardDiv">{listItems}</div>
    );
  }
  
  render() {
    return (
    <div className="container-fluid">
      <div id="first-half">
        <Card className="credList">
          <Card.Header>List of credentials</Card.Header>
          <Card.Body>
            <this.DisplayCredentials credentials={this.state.credentials} onclick={this.cardClicked} />
          </Card.Body>
        </Card>
      </div>
      <div id="second-half"> 
        <Card className="credSelected">
          <Card.Header>Selected</Card.Header>
          <Card.Body>
            ...
          </Card.Body>
        </Card>
      </div>
    </div>
    );
  }
}