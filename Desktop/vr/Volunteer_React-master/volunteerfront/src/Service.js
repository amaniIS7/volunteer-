import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuth: false
        }
    }


    render() {
        console.log(this.props)
        const { isAuth } = this.state;

        return (

            <div class="col">
            <li style={{marginBottom: "10px", width: "20rem"}} className="card text-white bg-secondary text-center">
               <div className="card-body"> 
     
               <p className="card-title"> {this.props.title} </p>
            {this.props.logedinuser.id == this.props.user.id ? 
             
            <div>
           
           <button class="comment" onClick={()=>{this.props.deleteService(this.props.serviceId)}}>DELETE</button><hr/>
                <button class="comment"  onClick={()=>{this.props.editView(this.props.serviceId)}}>EDIT</button>
            </div>
           : 
              null  
            }
            
            </div>
                </li>
            </div> 
        
       )
}}
