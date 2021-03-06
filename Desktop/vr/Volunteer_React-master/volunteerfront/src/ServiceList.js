import React, { Component } from 'react';
import axios from 'axios';
import Service from './Service';
import NewService from './NewService';
import ServiceEditFrom from './ServiceEditFrom';
import Servicedetails from './Servicedetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { CardColumns} from 'react-bootstrap';
import { Text } from 'react-bootstrap';




import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            services: [],
            isEdit: false,
            clickedId : '',
            isAuth: false,
            addView :false
            
        }
    }



    componentDidMount(){
        this.loadServiceList();
    }

    loadServiceList = () => {
        axios.get("/volunteer/services/index")
            .then(response =>{
                console.log(response)
                this.setState({
                    services: response.data
                })
            })
            .catch(error =>{
                console.log("Error retreiving service !!");
                console.log(error);
            })
        }

        
            addService = (service) =>{
                axios.post("/volunteer/services/add", service,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(response =>{
                        console.log("Added!!")
                        this.loadServiceList();
                        console.log(response)
                    })
                    .catch(error =>{
                        console.log("Error Adding service");
                        console.log(error)
                    })
            }
        
            deleteService= (id) =>{
                console.log(id)
                axios.delete(`/volunteer/services/delete?id=${id}`,{
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(response =>{
                        console.log(response)
                        this.loadServiceList();

                        console.log("Deleted!")
                        const updatedList = [...this.state.services];
                        const index = updatedList.findIndex(x => x.id === id);
                        if(index !== -1){
                            updatedList.splice(index, 1) 
                            this.setState({
                                services: updatedList
                            })
                        }
                    })
                    .catch(error =>{
                        console.log("Error Deleting !")
                        console.log(error)
                    })
            }
         
            editView =(id) =>{
                this.setState({
                    isEdit: !this.state.isEdit,
                    clickedId: id
                })
            }
            editservices = (service) =>{
                axios.put("/volunteer/services/edit", service, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(response =>{
                        console.log("Edited!!")
                        this.loadServiceList();
                        console.log(response)
                    })
                    .catch(error =>{
                        console.log("Error Editing services");
                        console.log(error)
                    })
            }

         
     

    render() {
console.log("from service list"+this.props.logedinuser)
        return (
            
            <div>


                   {/* {(!this.state.isEdit) ?  <NewService addService={this.addService} logedinuser={this.props.logedinuser} />: null} */}
         
 <button class="service"  onClick={()=>{this.setState({addView: !this.state.addView })}}>Add Service</button>

           {(this.state.addView) ?  <NewService addService={this.addService}logedinuser={this.props.logedinuser} />: 

<div>
              
<Router>    
<ul className= "row row-cols-2 row-cols-md-3 g-4 mt-3">    
    {this.state.services.map((Services, index) =>
                         <div key={index} >

                       {/* هنا نحط الديتيلز لكل وحدة  */}
                       {/* <CardColumns >  
             
             <Card  class={'card text-white bg-info mb-3'}  style={{marginTop: 40, marginBottom: 40, marginLeft:500 , width: 500}}>
<Card.Body style={{marginTop: 40, marginBottom: 40, marginLeft:30 ,  width: 450}}>
    */}

                    <Service {...Services} key={index} deleteService ={this.deleteService} editView={this.editView} logedinuser={this.props.logedinuser}/>
                   
              
                   
      < Link onClick={()=>this.setState({clickedId: Services.serviceId})}
 to="/Servicedetails" className="details">   Service details</Link>{" "}

<Route
  path="/Servicedetails"
  component={() => this.state.clickedId === Services.serviceId ? <Servicedetails {...Services} />:null }
></Route>


              
{(this.state.isEdit && this.state.clickedId === Services.serviceId ) ? <ServiceEditFrom   Service={Services} editservices={this.editservices}/> : null }       
                 


 {/* </Card.Body> */}
{/* </Card> */}
<div/>	

{/* </CardColumns>   */}

</div>)}
</ul>
</Router>

</div> }
</div>


        )
    }
}

