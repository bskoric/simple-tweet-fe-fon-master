import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { Route} from 'react-router-dom'
import './App.css';
import Layout from "./components/layout/Layout";
import 'fontsource-roboto';
import "./assets/css/main.css";

function App() {
  return (
      <div className="container-app">
        <Router>
          <Route path={"/"} component={Layout} />
        </Router>
      </div>
  );
}

export default App;
