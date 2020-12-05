import logo from './logo.svg';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Redirect} from "react-router";

import jwt_decode from "jwt-decode";
import './App.css';
import VisitorRegistration from "./components/visitor";
import AdminHome from "./components/admin/home";
import AdminLogin from "./components/admin/login";


  
export default class App extends Component {

  checkAdminLogin = ()=> {
      console.log("CHecking checkAdminLogin");
      let token = localStorage.getItem("user-token");
      if(!token) {
          return false;
      }

      let decoded = jwt_decode(token);
      console.log(decoded);
      if(decoded.loggedIn) {
      // if(decoded.loggedIn && decoded.exp >= Date.now()) {
          return true;
      }
      return false;

  }
  render() {

  return (
    <Router>

      <Switch>
        <Route exact path="/admin" component={() => <AdminHome checkAdminLogin={this.checkAdminLogin} />} />
        <Route exact path="/admin-login" component={() => <AdminLogin checkAdminLogin={this.checkAdminLogin} />} />
        <Route path="/" component={VisitorRegistration} />
        
      </Switch>
    </Router>

  );
  }
}
