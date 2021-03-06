import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class ChangePassword extends Component {
   
    state = {}

    changePassHandler = () => {
        this.props.changePassword(this.state);
    }
changeHandler = (e) => {
    let tt = {... this.state}
    tt[e.target.name] = e.target.value;
    this.setState(tt)
    console.log(tt);
} 
    
    
    render() {
        return (
            <div >
                <Container>
                   
                   <Form.Group>
                       <Form.Label>Email Address</Form.Label>
                       <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                   </Form.Group>
                   <Form.Group>
                     
                       <Form.Control className= "un" type="password" name="oldPassword" onChange={this.changeHandler} placeholder="old Password"></Form.Control>
                   </Form.Group>

                   <Form.Group>
                      
                       <Form.Control  className="pass" type="password" name="password" onChange={this.changeHandler} placeholder="Password" ></Form.Control>
                   </Form.Group>

                   


                   <Button className="submit" type="submit" block onClick={this.changePassHandler}>Submit</Button>
                   
                   
               </Container>
               
            </div>
        )
    }
}//end 
