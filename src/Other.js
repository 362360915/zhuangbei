import React, { Component } from 'react'
import EventHub from "./eventHub"
export default class Other extends Component {

    changeColor= ()=>{
        EventHub.trigger("changered")
    }

    render() {
        return (
            <div>
                <button onClick={this.changeColor}>变色</button>
            </div>
        )
    }
}
