import React, { Component } from 'react'
import Service from './Service'


export default class Comments extends Component {
    // componentDidMount(){
    //     this.loadcommentsList();
    // }

    // loadcommentsList = () => {
    //     axios.get("/volunteer/comments/index")
    //     .then(response =>{
    //         console.log(response)
    //         this.setState({
    //             Comments: response.data
    //         })
    //     })
    //     .catch(error =>{
    //         console.log("Error retreiving Authors !!");
    //         console.log(error);
    //     })
    // }
    render() {
        return (
            <div>
            {this.props.comments.map((comments, index) =>
                <div  key={index}>
                {comments.comment}

              {/* deletecomments ={this.deletecomments} editView={this.editView}/>
                {this.loadcommentsList(Service)} */}
                <hr />
               
                </div>)   }
    <form onSubmit={this.handleSubmit}>
                
     <div class="form-group">
    <label >Comment</label>
    <input  name="comment" type="text" class="form-control" id="exampleFormControlInput2" onChange={this.handleChange}></input> 
    </div>
 </form>
               
      </div>  )
    }
}

   