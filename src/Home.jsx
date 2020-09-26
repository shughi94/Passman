import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import {FaPlus} from "react-icons/fa";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      credentials: [],
      selected: null
    }
  }

  LogoutButton() {
    const history = useHistory();
  
    function logoutClick() {
      fetch('/logout',{
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      }).then(() => {
        history.push("/login");
      })
    }
  
    return (
      <Button className="userActionButton" type="button" onClick={logoutClick}>
        Logout
      </Button>
    );
  }

  addCredential() {

    const history = useHistory();

    function addCredClick() {
      history.push("/add-credential");
    }
   
    return (
      <Button className="userActionButton" type="button" onClick={addCredClick}>
        Add Credential  &nbsp; &nbsp;<FaPlus />
      </Button>
    );
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

  cardClicked = (id) => {
    console.log('clicked card: '+id);

    this.state.credentials.forEach(element => {
      if(element.id == id){
        this.setState({selected: element});
      }
    });
  }

  DisplaySelected(props) {

    let element = props.selected;

    function deleteCredential(elementId) {

      console.log(elementId);
      fetch('/credentials/' + elementId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          window.location.reload(true);
        } else {
         return;
        }
      });
    }

    if (element == null){
      return (<div>No credential is selected</div>);
    }
    else {
      return (
      <div>
        <Card border="primary" bg="light" >
          <Card.Header>{element.title}</Card.Header>
          <Card.Body>
            <Card.Text>Website: {element.website}</Card.Text>
            <Card.Text>{element.description}</Card.Text>
            <Card.Text>Username: {element.username}</Card.Text>
            <Card.Text>Password: {element.password}</Card.Text>
          </Card.Body>
        </Card>

        <Button className="userActionButton" type="button" onClick={(event) => {event.preventDefault();deleteCredential(element.id)}}>
          Delete
        </Button>

      </div>);
    }
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
      <div id="userAction" > 
        <this.addCredential />
        <this.LogoutButton />
      </div>
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
            <this.DisplaySelected selected={this.state.selected}></this.DisplaySelected>
          </Card.Body>
        </Card>
      </div>
    </div>
    );
  }
}