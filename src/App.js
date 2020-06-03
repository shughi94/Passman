import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Login from './Login';
import Add from './Add';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1 id="titleApp">PASSMAN</h1>
        <div id="mainBody">
          <Switch>
            <Route path="/" exact component={withAuth(Home)} />
            <Route path="/add-credential" exact component={withAuth(Add)} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
