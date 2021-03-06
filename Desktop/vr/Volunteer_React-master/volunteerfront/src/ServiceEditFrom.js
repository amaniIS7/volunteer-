import React, { Component } from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class ServiceEditFrom extends Component {
    constructor(props){
        super(props);
        this.state ={
            NewService : props.Service
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
        this.props.editservices(this.state.NewService);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                
     <div class="form-group"> 
    <label >Title</label>
    <input name="title" value={this.state.NewService.title} type="text" class="form-control" id="exampleFormControlInput2" onChange={this.handleChange}></input> 
   

  </div>


                    <div class="form-group">
    <label >Description</label>
    <input name="description" value={this.state.NewService.description} type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
                    
                    <div class="form-group">                
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="Category" onChange={this.changeHandler}>
                            <option value="">Select Category</option>
                            <option value="helth">Helth</option>
                            <option value="social">Social</option>
                            <option value="learn">Learn</option>
                            <option value="environment">Environment</option>
                        </Form.Control>
                        </Form.Group>
                     </div>
                    <div class="form-group">
    <label >Contact</label>
    <input name="contact"  value={this.state.NewService.contact} type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 
                    </div>
                    
                    <div class="form-group">
    <label >Duration</label>
    <input name="duration" value={this.state.NewService.start_duration} type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 
                    </div>
    <div class="form-group">
    <label >Start date</label>
    <input name="start_date" value={this.state.NewService.start_date} type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 
                    </div>

    <div class="form-group">
    <label >End date</label>
    <input name="end_date" value={this.state.NewService.end_date} type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
                    <div class="form-group">
    <label >City</label>
    <input name="city" type="text" class="form-control" id="exampleFormControlInput1" onChange={this.handleChange}></input> 

                    </div>
            

                    <div>
                    <input class="submit" type="submit" value="update Service"></input>


                    </div>
                </form>
            </div>
        )
    }
}