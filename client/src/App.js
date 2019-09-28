import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';
import EmRoute from './components/routes/EmRoute'
import MeRoute from './components/routes/MeRoute'

import Private from './pages/Private';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Login from './pages/login';
import Chat from './pages/chat';
import Em from './pages/em'
import Me from './pages/me'

import Menu from './components/ui/menu'
import AuthProvider from './contexts/auth-context.js';

import './App.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
            <Switch>
            <AnonRoute
              exact
              path="/"
              render={(props)=> <> <Landing {...props}/> </>} /> 
            <AnonRoute
              exact
              path="/signup"
              render={(props)=> <> <Menu/> <Signup {...props}/> </>} />
            <AnonRoute
              exact
              path="/login"
              render={(props)=> <Login {...props}/>} />
            <EmRoute
              exact
              path="/em"
              render={props => <><Menu/> <Em {...props} /> </>} />
            <MeRoute
              exact
              path="/em"
              render={props => <><Menu/> <Me {...props} /> </>} />
            <PrivateRoute
              exact
              path="/private"
              render={(props)=> <Private {...props}/>} />
            <PrivateRoute
              exact
              path="/chat/:id"
              render={props => <><Menu/> <Chat {...props} /></> } />
            </Switch>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
