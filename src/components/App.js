import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link,browserHistory } from 'react-router';
import {fetchUser,selectAuthor} from '../actions/actions';
import List from './List';
import MyHeader from './Header';
import Side from './Side';
import fetch from 'isomorphic-fetch';
import {logOut} from '../actions/actions';
import {Button,Menu, Icon,Input, Layout} from 'antd';
import BaseComponent from './baseComponent';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

require('../../assets/styles/app.scss');
class App extends BaseComponent {
    constructor(props){
       super(props);
       this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        const {dispatch} = this.props;
        localStorage.removeItem('token');
        dispatch(logOut());
        browserHistory.push('/');
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchUser())
    }
    render() {
        const {user,posts} = this.props;
        return (
            <div id="hey">
                <Layout>
                    <MyHeader logOut={this.handleLogout} user={user}/>
                    <Content style={{backgroundColor: '#EDEDED', padding:"15px 5%"}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <Icon type="github" style={{ fontSize: 20, color: 'black' }} />
                        <span style={{fontSize:'14px',marginLeft:'5px'}}>Github</span>
                    </Footer>
                </Layout>
            </div>
        )
  }
}

App.PropTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
}
function mapStateToProps(state) {
  const { user,postsByAuthor,selectedAuthor } = state
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    user,
    posts: posts||[]
  }
}
export default connect(mapStateToProps)(App)