import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Register extends Component {



    state = {userRole: 'ROLE_USER',
    }
    
    

    registerHandler = () => {
        this.props.register(this.state);
        
    }


changeHandler = (e) => {
    
    let tt = {... this.state}
    tt[e.target.name] = e.target.value;
    this.setState(tt)
    console.log(tt);
} 
    
    render() {
        return (
            <div className="singStyle">

<h1 class="sign" align="center">Sing up</h1>
                <Container>
                    <Form.Group >
                        
                        <Form.Control className= "un2" type="text" name="firstName" onChange={this.changeHandler}  placeholder="First Name"></Form.Control>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label></Form.Label>
                        <Form.Control  className= "un1" name="lastName" onChange={this.changeHandler}  placeholder="Last Name"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control  className= "un1" type="email" name="emailAddress" onChange={this.changeHandler}  placeholder="Email Address"></Form.Control>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label></Form.Label>
                        <Form.Control  className= "un1" type="password" name="password" onChange={this.changeHandler} placeholder="Password"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control className= "un1" type="password" name="confirmPassword" onChange={this.changeHandler} placeholder="confirm Password"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control className= "un1" type="phoneNumber" name="phoneNumber" onChange={this.changeHandler} placeholder="Phone Number"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control  name="userRole" value={this.state.userRole} type="hidden" >
  
                        </Form.Control>
                    </Form.Group>

                    <Button  className="submit" variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>
            </div>
        )
    }
}
