
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import VisitorRegistration from "./components/visitor";
import AdminHome from "./components/admin/home";



export default class App extends Component {

  render() {

    return (
      <Router>

        <Switch>
          <Route exact path="/admin" component={AdminHome} />
          <Route path="/" component={VisitorRegistration} />

        </Switch>
      </Router>

    );
  }
}
