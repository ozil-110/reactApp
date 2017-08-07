import React, { PropTypes, Component } from 'react';
import { Router, Route, Link ,browserHistory} from 'react-router';
import {Button,Menu, Icon,Input, Layout} from 'antd';
import BaseComponent from './baseComponent';
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

export default class Header extends BaseComponent {
    constructor(props){
        super(props)
        this.state = {
           current: ''
       }
        this.handleNavigator = this.handleNavigator.bind(this);
    }
    handleSearch(author){
        this.refs.search.input.refs.input.value=''
        browserHistory.push(`/list/${author}`)
    }
    
    handleNavigator(e){
        this.setState({
            current: e.key
        })
    }
    render(){
        const {user,logOut} = this.props;
        return (
            <div>
                <Menu selectedKeys={[this.state.current]}  onClick={this.handleNavigator} mode="horizontal" style={{padding:'10px 30px 10px 71px',background:'#404040'}}>
                    <Menu.Item key="search" style={{border:'none'}}>
                        <Search
                            ref='search'
                            placeholder="搜索指定用户的文章"
                            style={{ width: 200 }}
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Menu.Item>
                    <Menu.Item key="list" style={{border:'none'}}>
                        <Link to="/"><div style={{color:'rgba(255,255,255,0.67)'}}>首页</div></Link>
                    </Menu.Item>
                    <Menu.Item key="space" key="space" style={{border:'none'}}>
                        <Link to="/space"><div style={{color:'rgba(255,255,255,0.67)'}}>个人中心</div></Link>
                    </Menu.Item>
                    {
                        user.name && (
                            <Menu.Item key="publish" style={{border:'none'}}>
                                <Link to="/publish"><div style={{color:'rgba(255,255,255,0.67)'}}>发表文章</div></Link>
                            </Menu.Item>
                        )
                    }
                    {
                        user.name && (
                                <SubMenu title={<div style={{color:'rgba(255,255,255,0.67)'}}>{user.name}</div>}>
                                    <Menu.Item key="setting:1">个人中心<Link to="/space">个人中心</Link></Menu.Item>
                                    <Menu.Item key="setting:2">设置<Link to="/space">个人中心</Link></Menu.Item>
                                    <Menu.Item key="setting:3">喜欢</Menu.Item>
                                    <Menu.Item key="setting:4">关于</Menu.Item>
                                </SubMenu>
                        )    
                    }
                    {
                        !user.name && <Menu.Item style={{border:'none'}}><Link to="/Space"><div style={{color:'rgba(255,255,255,0.67)'}}>登录/注册</div></Link></Menu.Item>
                    }
                    {
                        user.name && (
                            <Menu.Item key="logout" style={{border:'none'}}>
                                <div onClick={()=>logOut()} style={{color:'rgba(255,255,255,0.67)'}}>退出</div>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </div>
        )
    }
}

Header.PropTypes = {
    user: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired
}