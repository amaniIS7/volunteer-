import React, { Component } from 'react'
import Comments from './Comments'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Servicedetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            commentsView: false   
        }
    }
    
    render() {
        return (
            <div>
                <Router>
                {!this.state.commentsView ? 

                <div>
               <strong>Title:</strong> {this.props.title} <br/>
               <strong>Description: </strong> {this.props.description}<br/>
               <strong>Category: </strong> {this.props.category}<br/>
               <strong>Contact: </strong>{this.props.contact}<br/>
               <strong>Duration: </strong>{this.props.duration}<br/>
               <strong>City:</strong> {this.props.city}<br/>
               <strong>Satrt Date: </strong>{this.props.start_date}<br/>
               <strong>End Date: </strong>{this.props.end_date}<br/>
               <strong>Certificate Number: </strong> {this.props.certificate_number}<br/>
                </div>
    :<Comments comments={this.props.comments}/>
}
        <button className="comment" onClick={() => {this.setState({commentsView: ! this.state.commentsView})}}> Add Comment </button>
    </Router>
            </div>
         

        )
    }
}
