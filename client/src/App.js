import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import  store from './store'

import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Main from './components/Layout/Main'
import Profile from './components/Profile/Profile'
import NotFound from './components/404'

import { logoutUser, getCurrentUser } from './actions/authActions'
import setAuthHeader from './utils/setAuthHeader';

if(localStorage.getItem('jwtToken')) {
  const currentTime = Date.now() / 1000
  const decode = jwtDecode(localStorage.getItem('jwtToken'))
  if(currentTime > decode.exp) {
    store.dispatch(logoutUser())
  } else {
    setAuthHeader(localStorage.getItem('jwtToken'))
    store.dispatch(getCurrentUser())
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Main>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Register}/>
                <Route path="/profile/:userId" component={Profile}/>
                <Route component={NotFound}/>
              </Switch>
            </Main>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
