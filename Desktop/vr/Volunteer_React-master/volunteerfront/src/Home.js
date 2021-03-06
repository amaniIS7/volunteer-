import React, { Component } from 'react'
import axios from 'axios';
import logo from './image/volunteer-logo.png'
import { Route, Router } from 'react-router-dom';
import Register from './user/Register'; 
import Login from './user/Login'; 
import "./App.css";
import ServiceList from './ServiceList';
export default class Home extends Component {
    render() {
        return (
            <div>
              <header>

              <h1 className="ayah">
فَمَن تَطَوَّعَ خَيْرًا
فَهُوَ خَيْرٌ لَّهُ
<span> سورة البقرة</span>
</h1>
             </header> 
             <img class="logo" src = {logo} alt= "Logo" width= "400" height = "430" /> 
             <div className="fullheasrts"><p>Full Hearts</p></div>
          {/* <footer class="footer">&copy;2021 GA</footer> */}
            </div>
        )
    }
}

