import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import { React, Component, useEffect, useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
  } from "react-router-dom";

import Home from './components/Home';
import Search from './components/Search';
import List from './components/List';

const _ = require('lodash');

class App extends Component {
  render() {
      return (
          <div className="container">
             <HashRouter>
              <Header />
                  <Routes>
                      <Route path="/" element={ <Search/> } />
                      <Route path="/search" element={ <Search /> } />
                      <Route path="/list" element={ <List /> } />
                  </Routes>
              </HashRouter>
          </div>
      );
  }
};

export default App;
