import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';
import {logIn} from '../actions/actions';
import { Input, Button,Icon } from 'antd';
import BaseComponent from './baseComponent';

class Reg extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            passwd: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const {dispatch} = this.props;
        const name = this.state.name,
            passwd = this.state.passwd;
        const content = JSON.stringify({
                name,
                passwd
            });
        fetch('/api/reg',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                console.log('注册成功')
                return res.json()
            }
        }).then(json=>{
            if(json){
                localStorage.setItem('token',json)
                dispatch(logIn({
                    name,
                    score: 0
                }))
                browserHistory.push('/')
            } else {
                console.log("注册失败")
            }
        })
    }
    render(){
        const { name,passwd } = this.state;
        const suffix = name ? <Icon type="close-circle" onClick={()=>{
            this.setState({ name: '' });
        }} /> : null;
        return (
            <div>
                <h3 style={{paddingBottom:'25px'}}>注册</h3>
                <div style={{marginBottom:'10px',color:'#000'}}>
                用户名&nbsp;
                    <Input
                        style={{width:'282px'}}
                        placeholder="用户名"
                        suffix={suffix}
                        value={name}
                        onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}
                    />
                </div>  
                <div style={{marginBottom:'10px',color:'#000'}}>  
                密 码&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input
                        style={{width:'282px'}}
                        type="password"
                        placeholder="密码"
                        value={passwd}
                        onChange={(e)=>{
                            this.setState({passwd:e.target.value})
                        }}
                    />
                </div>    
                    <Button type="primary" onClick={this.handleClick}>注册</Button>
            </div>
        )
    }
}
Reg.PropTypes = {
    user: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const { user } = state
  return {
    user
  }
}
export default connect(mapStateToProps)(Reg)