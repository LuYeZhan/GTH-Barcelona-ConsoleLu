import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';

import Em from './pages/me';
import CreateTrip from './pages/createTrip';
import Signup from './pages/signup';
import Login from './pages/login';
import Landing from './pages/landing';

import Menu from './components/ui/menu'

import AuthProvider from './contexts/auth-context.js';

import './App.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          
            <Switch>
              <AnonRoute exact path="/" render={props => <><Landing {...props}/></>} />
              <AnonRoute path="/signup" render={props => <><Signup {...props}/></>} />
              <AnonRoute path="/login" render={props => <><Login {...props}/></>} />
              <PrivateRoute
                exact
                path="/private"
                render={props => <><Menu/> <Em {...props} /></> } />
              <PrivateRoute
                exact
                path="/trip/add"
                render={props => <><Menu/> <CreateTrip {...props} /></> } />
            </Switch>

        </AuthProvider>
      </Router>
    )
  }
}

export default App;
