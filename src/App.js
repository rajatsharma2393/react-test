import logo from './logo.svg';

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

function  checkAdminLogin(){
    let token = localStorage.getItem("user-token");
    if(!token) {
        return false;
    }

    let decoded = jwt_decode(token);
    if(decoded.login && decoded.exp >= Date.now()) {
        return false;
    }
    return true;

}
  
function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/admin">
          {checkAdminLogin() ? <AdminHome/> : < AdminLogin/>}
        </Route>
        <Route exact path="/admin-login">
          {!checkAdminLogin() ? <AdminLogin/> : < AdminHome/>}
        </Route>
        <Route path="/" component={VisitorRegistration} />
        
      </Switch>
    </Router>

  );
}

export default App;
