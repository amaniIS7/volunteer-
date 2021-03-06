import React, { Component } from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class NewService extends Component {
    constructor(props){
        super(props);
        this.state ={
            NewService : {
                user:props.logedinuser
            }
        }
        
    }
    handleChange= (event) =>{
        const attributeToChange = event.target.name
        const newValue = event.target.value
        const updatedService = {...this.state.NewService}
        updatedService[attributeToChange] = newValue
        console.log(updatedService)
        this.setState({
            NewService: updatedService
        })
    }
    handleSubmit =(event) =>{
        event.preventDefault()
        this.props.addService(this.state.NewService);
    }
  
    render() {
        return (
            <div className="editform">
                 
                <form onSubmit={this.handleSubmit}>
                
                    <div class="form-group"  className="un2">
    <label >Title</label>
    <input name="title" type="text" class="form-control" id="exampleFormControlInput2" onChange={this.handleChange}></input> 
   

  </div>




                    <div class="form-group"  className="un2"> 
    <label >description</label>
    <input name="description" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
                    

                    <Form.Group  className="un2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="Category" onChange={this.changeHandler}>
                            <option value="">Select Category</option>
                            <option value="helth">Helth</option>
                            <option value="food">Social</option>
                            <option value="food">Learn</option>
                            <option value="food">Environment</option>
                        </Form.Control>
                        </Form.Group>


                    <div class="form-group"  className="un2">
    <label >Contact</label>
    <input name="contact" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 
                    </div>
                    

                    <div class="form-group"  className="un2">
    <label >Duration</label>
    <input name="duration" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>

                    <div class="form-group"  className="un2">
    <label >Start Date</label>
    <input name="start_date" type="date" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div> 
                    <div class="form-group"  className="un2">
    <label >End Date</label>
    <input name="end_date" type="date" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div> 
                  
                    <div class="form-group"  className="un2">
    <label >City</label>
    <input name="city" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
            
                    <div class="form-group"  className="un2">
    <label >Certificate Number</label>
    <input name="certificate_number" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
                    <div>
                        <input class="submit3" type="submit" value="Add Service"></input>

                    </div>
                </form>
            </div>
        )
    
}
}