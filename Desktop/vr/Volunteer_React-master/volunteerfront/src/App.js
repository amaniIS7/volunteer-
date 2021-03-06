import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./user/Register";
import Login from "./user/Login"; //
// import Forgot from "./user/Forgot";
import axios from "axios"; //to get the model from eclips
import Home from "./Home";
import Profile from "./Profile";
import React, { Component } from "react";
import { decode } from "jsonwebtoken";
import { Alert, Fade } from "react-bootstrap";
import ChangePassword from './user/ChangePassword';
import ServiceList from './ServiceList';
import { Redirect } from 'react-router';
export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    message: null,
    successMessage: null,
    redirect: false,
    logedinuser:null,
  };

  lodeprofil(email){
    //axios Request to get tha user 
    // if the reponse
    //inside then set state logedin user with response data 
    axios.get("/volunteer/user/profile",{params:{email: email}
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

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = decode(token);
      localStorage.setItem("email",user.sub); 
      if (user) {
        this.setState({
          isAuth: true,
          user: user,
        });
        this.lodeprofil(user.sub)
      } else if (!user) {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////
registerHandler = (user) => {
    axios
      .post("volunteer/user/registration", user)
      .then((response) =>  {
        console.log(response);
        // if (response.data.token != null) {
          // localStorage.setItem("token", response.data.token);
          // let user = decode(response.data.token);
if( response.data.message ==("User registered successfully")){
  this.setState({ redirect: true });
  this.setState({ 
    successMessage: response.data.message
  });
}else{
  this.setState({
    message: response.data.message
  })
}
      //   } else {
      //     this.setState({
      //       user: null,
      //       message: "Your registered successfully",
      //     });
      //   }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  loginHandler = (user) => {
    axios
      .post("volunteer/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token); 
          let user = decode(response.data.token);
          localStorage.setItem("email",user.sub); 
          this.lodeprofil(user.sub)
          this.setState({ //هنا نشوف اذا مسجل ولا لا 
            isAuth: true,
            user: user,
            successMessage: "Successfully logged in!!!",
            message: null
          });
          window.setTimeout(() => {
            this.setState({
              message: null
            });
          }, 2000);
        
        } else {
          this.setState({
            isAuth: false,
            user: null,
            message: "Incorrect username or password",
          });
          window.setTimeout(() => {
            this.setState({
              message: null
            });
          }, 2000);
        
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          message: "Error Occured. Please try again later!!!",
        });
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.setState({
      isAuth: false,
      user: null,
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  changePassHandler = (user) => {
    axios
    .post("volunteer/user/changePassword", user)
    .then((change) => {
      console.log(change);
if( change.data.message ==("User you change the password successfully successfully")){
this.setState({ 
  successMessage: change.data.message
});
}else{
this.setState({
  message: change.data.message
})
}
    })
    .catch((error) => {
      console.log(error);
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //feadbaak msg
  // state ={
  //   visible:true
  // }
  // toggle(){
  //   this.setState({
  //     visible: ! this.state.visible
  //   });
  // }
  

  render() {
    const { isAuth } = this.state;
    const { redirect } = this.state;
    if (this.state.logedinuser != null)
    console.log("logedin user state"+this.state.logedinuser.firstName)
    const message = this.state.message ? (
      <Alert variant="danger">{this.state.message}</Alert>
    ) : null;
    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;
    return (
      <Router>
        <nav>
          {message} {successMessage}
          {isAuth ? (
            <div className="nav">
              <button className ="homebutton"><Link to="/">Home</Link></button> {"  "}
              <button className ="homebutton "><Link to="/profile">Profile</Link></button>{"  "}
              <button className ="homebutton "><Link to="/ServiceList">Voluntary opportunities</Link></button>{"  "}
              {/* <Link to="/ServiceList">Services</Link> */}
              <div className="welcome">
              {this.state.user && this.state.logedinuser? "Welcome  " + this.state.logedinuser.firstName : null} {"  "}
              </div>
              <Link to="/logout" onClick={this.onLogoutHandler}>
                 Logout
              </Link>{" "}
            </div>
          ) : (
            <div className="nav">
              <header>
              <button className ="homebutton "><Link to="/">Home</Link></button> {"  "}
              <button className ="homebutton"><Link to="/Register">Register</Link></button> {"  "}
              <button className="homebutton "><Link to="/Login">Login as volunteernp</Link></button> {"  "} 
              </header> 
</div> ) 
        }
           </nav>
           <div>
          <Route 
            path="/register"
            component={() =>
              redirect? <Login login={this.loginHandler}/>: <Register register={this.registerHandler} />}
          ></Route>
            <Route
            path="/login"
            component={()=> <Login login={this.loginHandler} />}
          ></Route>
           <Route
            path="/changePassword"
            component={() =>
              isAuth ? <ChangePassword changePassword={this.changePassHandler} />: <Login login={this.loginHandler} /> }
          ></Route>
 {/* <Route
            path="/ServiceList"
            component={() =>
              isAuth ? <ServiceList logedinuser={this.state.logedinuser}/> : <Login login={this.loginHandler} />}
          ></Route> */}
 <Route
            path="/ServiceList"
            component={() =>
              isAuth ?  <ServiceList logedinuser={this.state.logedinuser}/> : <Login login={this.loginHandler} />}
          ></Route>
          <Route
            exact path="/"
            component= {Home}>
          </Route>

          <Route exact path="/profile" component={() => <Profile logedinuser= {this.state.logedinuser}/>}></Route>
          {/* <Route
            exact path="/ServiceList"
            component= {ServiceList}>
          </Route> */}
          </div>
          <footer class="footer">&copy;2021 GA</footer>     

          </Router>
          
      );
    }
  }
