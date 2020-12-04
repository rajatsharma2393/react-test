import logo from './logo.svg';
import './App.css';
import VisitorRegistration from "./components/visitor";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Switch>
        <Route path="/admin">
          <div>Admin</div>
        </Route>

        <Route path="/" component={VisitorRegistration}>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
