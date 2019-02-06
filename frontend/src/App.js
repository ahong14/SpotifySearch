import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import Home from './components/Home/Home';

//Main app component, contains routing from auth to home page
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path = "/" component = {AuthPage}/>
          <Route path = "/home" component = {Home}/>
        </div>
      </Router>
    );
  }
}

export default App;
