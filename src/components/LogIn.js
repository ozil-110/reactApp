import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import fetch from 'isomorphic-fetch';
import {logIn,fetchUser} from '../actions/actions';
import { Input, Button,Icon } from 'antd';
import BaseComponent from './baseComponent';

class LogIn extends BaseComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            name: '',
            passwd: ''
        }
    }
    handleClick(){
        const {dispatch} = this.props;
        const name = this.state.name,
            passwd = this.state.passwd;
        const content = JSON.stringify({
                name,
                passwd
            })
        fetch('/api/log',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                console.log('登录成功')
                return res.json()
            }
        }).then(token=>{
                if(token){
                    dispatch(logIn({name}))
                    localStorage.setItem('token',token)
                    dispatch(fetchUser())
                    browserHistory.push('/')
                } else {
                    console.log('登录失败!')
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
                <h3 style={{paddingBottom:'25px'}}>登录</h3>
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
                    <Button type="primary" onClick={this.handleClick}>登录</Button>
            </div>
        )
    }
}
LogIn.PropTypes = {
    user: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const { user } = state
  return {
    user
  }
}
export default connect(mapStateToProps)(LogIn)