import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';

import Em from './pages/me';
import Signup from './pages/signup';
import Login from './pages/login';

import Menu from './components/ui/menu'

import AuthProvider from './contexts/auth-context.js';

import './App.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute
              exact
              path="/private"
              render={props => <><Menu/> <Em {...props} /></> } />
            </Switch>

        </AuthProvider>
      </Router>
    )
  }
}

export default App;
