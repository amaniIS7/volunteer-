import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChangePassword from './user/ChangePassword';
import axios from "axios";

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state ={
            logedinuser: props.logedinuser
    }

} 
componentDidMount(){
   
    console.log("insaid cdm"+localStorage.getItem("email"))
    axios.get("/volunteer/user/profile",{params:{email: localStorage.getItem("email")
}
    ,
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
  })
    .then(response =>{
        console.log(response)
        this.setState({
          logedinuser: response.data
        })
    })
    .catch(error =>{
        console.log("Error retreiving service !!");
        console.log(error);
    })
}
    handleChange= (event) =>{
        const attributeToChange = event.target.name
        const newValue = event.target.value
        const updatedUser = {...this.state.logedinuser}
        updatedUser[attributeToChange] = newValue
        console.log(updatedUser)
        this.setState({
            logedinuser: updatedUser
        })
    }

    
    handleSubmit =(event) =>{
        event.preventDefault();
        // this.props.editUser(this.state.logedinuser);

    }

    
    changePassHandler = (user) => {

        axios
        .put("volunteer/user/changePassword", user)
        .then((change) => {
          console.log(change);
    
       
          if( change.data.message ==("User you change the password successfully successfully")){
    
    this.setState({ 
              
              
      successMessage: change.data.message
    });
    window.setTimeout(() => {
      this.setState({
        message: null
      });
    }, 2000);
    
    
    }else{
    this.setState({
    
      message: change.data.message
    
    })
    window.setTimeout(() => {
      this.setState({
        message: null
      });
    }, 2000);
    
    
    }
       
        })
        
        .catch((error) => {
          console.log(error);
        });
    
       
    
    };

    ////////////////////////////////////////////////////////////////////////
  

  ///////////////////////////////////////////////////////
    render() {

        return (

           <div className="profile">
               <h1 className="myprofile"  align="center">My Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name </label> 
                        <input className= "un3"
                        name="firstName"
                        type="text"
                        value={this.state.logedinuser.firstName}
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                     <label>Last Name </label> 
                        <input className= "un3"
                        name="lastName"
                        type="text"
                        value={this.state.logedinuser.lastName}
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                     <label>Phone Number </label>
                        <input className= "un3"
                        name="phoneNumber"
                        type="phoneNumber"
                        value={this.state.logedinuser.phoneNumber}
                        onChange={this.handleChange}></input>
                    </div>
                    <div> 
                        <input class = "submit2" type="submit" value="Edit Profile"></input>

                    </div>
                    
                </form>
                 {/* <button className ="submit " onClick={this.passHandler}>change password</button> {"  "} */}
                 <button className ="homebutton "><Link to="/profile/changePassword" >
change password</Link></button>{"  "}

<Route
            path="/profile/changePassword"
            component={() => 
                <ChangePassword changePassword= {this.changePassHandler} />}
          ></Route>

                 

                
            </div>
        )
    }
}