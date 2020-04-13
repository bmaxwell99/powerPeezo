import React, { Component } from 'react';
import './App.css';

import {NavLink} from 'react-router-dom'; 

export default class Nav extends Component {
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src="../logo.png" className="logo" alt="brand logo for app Solutions"></img>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <a className="navbar-brand" href='../public/index.html'>Solutions.</a>
          </div>
          <div className="navbar-nav">
           <NavLink exact to="/setup" className="nav-item nav-link">Setup</NavLink>
          </div>
          <div className="navbar-nav">
           <NavLink exact to="/entry" className="nav-item nav-link">Entry</NavLink>
          </div>
          <div className="navbar-nav">
            <NavLink exact to="/Status" className="nav-item nav-link">Status</NavLink>
          </div><div className="navbar-nav">
            <div className="visual"> 
              <NavLink exact to="/visuals" className="nav-item nav-link">Visuals</NavLink>
            </div>
          </div>
        </nav>
      )
      }
  }