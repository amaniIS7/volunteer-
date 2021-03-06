import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap' //هذا عشان style for the page


export default class Login extends Component {

    state = {}

    loginHandler = () => {
        this.props.login(this.state);
    }


changeHandler = (e) => {
    let tt = {... this.state}
    tt[e.target.name] = e.target.value;
    this.setState(tt)
    console.log(tt);
} 
    
    
    render() {
        return (
            <div className="loginStyle">
                <Container>
                <h1 class="sign" align="center">Login</h1>
                   <Form.Group > 
                       
                       <Form.Control className= "un" type="email" name="emailAddress" onChange={this.changeHandler} placeholder="Email Address"></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       
                       <Form.Control  className="pass" type="password" name="password" onChange={this.changeHandler} placeholder="Password"></Form.Control>
                   </Form.Group>


                   <Button  className="submit" block onClick={this.loginHandler}>Login</Button>
                   
                   
               </Container>
               
            </div>
        )
    }
}//end 
