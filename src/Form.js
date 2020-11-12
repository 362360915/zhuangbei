import React, { Component } from 'react'
import Input from './input'
import List from './List'
import Other from './Other'
import axios from 'axios'

export default class Form extends Component {

    constructor(){
        super()
        this.handoulclick = this.handoulclick.bind(this)
        this.state = {
            value:"钢铁",
            list:[
                {id:1,title:"faker"},
                {id:2,title:"uzi"}
            ],
            student:[],
            username:"",
            age:0
        }
      }
      
    handoulclick(){
    console.log(this)
    }      

    handleChange = e=>{
        this.setState({
            value:e.target.value
        })
    }

    change= e=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    addd=()=>{
        axios.post("http://localhost:4000/list",{
            username:this.state.username,
            age:this.state.age
        }).then(res=>{
            this.getdata()
            this.setState({username:"",age:0})
        })
    }

    add = title=>{
        this.setState({
            list:[...this.state.list,{id:parseInt(Math.random()*10000),title}]
        })
    }
    
    componentDidMount(){
        this.getdata()
    }

    getdata=()=>{
        axios.get("http://localhost:4000/list").then(res=>{
            this.setState({
                student:res.data
            })
        })
    }

    delete = id=>{
        axios.delete("http://localhost:4000/list/"+id).then(res=>{
            this.getdata()
        })
    }

    update = ({username,age,id})=>{
        let value = prompt("请输入修改信息",username+","+age)
        let arr = value.split(",")
        axios.patch("http://localhost:4000/list/"+id,{
            username:arr[0],
            age:arr[1]
        }).then(res=>{
            this.getdata()
        })
    }

    blur = username=>{
        let blur= prompt("请插我")
        axios.get("http://localhost:4000/list?username_like="+blur).then(res=>{
            this.setState({
                student:res.data
            })
        })
    }

    render() {
        return (
            <div>
                <input value={this.state.value} onChange={this.handleChange} />
                <p>{this.state.value}</p>
                <button onClick={this.handoulclick}>点击</button>
                <hr/>
                <Input add={this.add}/>
                <List list={this.state.list} />
                <Other/>
                <ul>
                    <input id="username" type="text" value={this.state.username} onChange={this.change} placeholder="姓名"/>
                    <input id="age" type="number" value={this.state.age} onChange={this.change} placeholder="年龄"/>
                    <button onClick={this.addd}>添加</button>
                    <button onClick={this.blur}>模糊查询</button>
                    <button onClick={this.getdata}>返回</button>
                    {
                        this.state.student.map((item)=>{
                        return <li key={item.id}>{item.username} -- {item.age}
                                <button onClick={this.delete.bind(this,item.id)}>删除</button>
                                <button onClick={this.update.bind(this,item)}>修改</button>
                            </li> 
                        })
                    }
                </ul>
            </div>
        )
    }
}
