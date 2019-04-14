import React, { Component } from 'react';
import Login from './components/Login';
import Confirm from './components/Confirm';
import User from './components/User';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/user" component={User} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
