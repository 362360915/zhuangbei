import React, { Component } from 'react'
import EventHub from './eventHub'

export default class input extends Component {
    state={
        color:"red"
    }

    componentDidMount(){
        EventHub.on("changered",color=>{
            this.setState({
                color:"yellow"
            })
        })
    }

    keyUp = e=>{
        if(e.keyCode === 13){
            this.props.add(e.target.value)
            e.target.value = ""
        }
    }

    render() {
        return (
            <div>
                <input placeholder="输入我吧" onKeyUp={this.keyUp}/>
                <p style={{color:this.state.color}}>老王八蛋</p>
            </div>
        )
    }
}
