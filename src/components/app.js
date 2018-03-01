import React, { Component } from 'react';
import ContactsComponent from './contact';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Route path="/" component={ContactsComponent} />
    );
  }
}

export default connect(state => state)(App);
