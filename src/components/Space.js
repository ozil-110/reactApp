import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import {logOut} from '../actions/actions';
import Side from './Side';
import Posts from './Posts';
import { Button,Card,Row,Col,Rate,Icon,Layout } from 'antd';
import BaseComponent from './baseComponent';
const { Header, Footer, Sider, Content } = Layout;

class Space extends BaseComponent {
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.state = {
            myposts: []
        }
    }
    handleLogOut(){
        const {dispatch,user} = this.props;
        localStorage.removeItem('token');
        dispatch(logOut())
    }
    componentDidMount(){
        const {dispatch,user} = this.props;
        fetch(`/api/post?author=${user.name}`,{
            method: 'GET'
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(json=>{
            this.setState({
                myposts: json
            })
        })
    }
    render(){
        const {user,posts} = this.props;
        let postsHaveNoComment = posts.filter((post)=>post.discussion.length === 0);
        return (
            <div>
                <Layout>
                    <Content style={{marginRight:'20px'}}>
                        {
                            !user.name && <div style={{minHeight:'400px'}}>
                                <Button type="primary"><Link to="/logIn">登录</Link></Button>
                                <Button type="primary" style={{marginLeft:'5px'}}><Link to="/reg">注册</Link></Button>
                            </div>
                        }
                        {
                            user.name && <div>
                                <div style={{backgroundColor:'white'}}>
                                    <div style={{backgroundColor:'#F0F8FF',padding:'10px 10px',marginBottom:'8px'}}><Link to="/"><span style={{color:'#9ACD32'}}>主页</span></Link></div>
                                    <div style={{padding:'0 10px'}}>
                                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501776660441&di=2c21702500b421807c941569ec4de133&imgtype=0&src=http%3A%2F%2Fwww.qq745.com%2Fuploads%2Fallimg%2F141227%2F1-14122H11147.jpg" style={{height:'80px'}}></img>
                                        <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>
                                        <br/>
                                        <span style={{color:'red',paddingBottom:'5px'}}>积分:</span> {user.score}
                                        <br/>
                                        <span style={{marginTop:'10px'}}>"这天气也太热了吧"</span>
                                        <div style={{backgroundColor:'white',paddingTop:'8px'}}>
                                            <Link to="/publish">发表文章</Link>
                                            <span onClick={this.handleLogOut} style={{color:'#108ee9',paddingLeft:'5px',cursor:'pointer'}}>退出登录</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div style={{backgroundColor:'white',marginTop:'20px'}}>
                                    <div style={{backgroundColor:'#F0F8FF',padding:'10px 10px',marginBottom:'8px'}}><span>我发表的文章</span></div>
                                    {
                                        this.state.myposts.length ? <Posts posts={this.state.myposts} /> : <div>还没有发表任何文章，去发表一篇牢骚吧</div>
                                    }
                                    
                                </div>
                            </div>
                        }
                        
                </Content>
                <Sider width="300" style={{backgroundColor:"#EDEDED"}}>
                    <Side user={user} postsHaveNoComment={postsHaveNoComment}/>
                </Sider>
                </Layout>
            </div>
        )
    }
}
/*
Space.PropTypes = {
    posts: PropTypes.array.isRequire,
    user: PropTypes.object.isRequire
}*/
function mapStateToProps(state) {
  const { selectedAuthor, postsByAuthor,user } = state;
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    posts: posts||[],
    user
  }
}
export default connect(mapStateToProps)(Space);