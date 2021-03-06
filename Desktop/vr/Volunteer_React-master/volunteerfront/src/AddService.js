import React, { Component } from 'react'
export default class Service extends Component {
    render() {
        return (
            <li>
                {this.props.title}
                {this.props.description}
                <hr />
            </li>
        )
    }
}
