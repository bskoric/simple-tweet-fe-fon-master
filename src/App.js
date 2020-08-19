import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import Layout from "./components/layout/Layout";
import 'fontsource-roboto';
import AuthenticatedRoute from "./components/login/AuthenticatedRoute";
import Login from "./components/login/Login";

function App() {
  return (
      <div>
        <Router>
            <Switch>
                <AuthenticatedRoute path='/login' exact={true} component={Login}/>
                {/*<AuthenticatedRoute path="/logout" exact component={Logout} />*/}
                <AuthenticatedRoute path='/**' exact={true} component={Layout}/>
            </Switch>
        </Router>
      </div>
  );
}

export default App;
