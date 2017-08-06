import React, { PropTypes, Component } from 'react';
import { Router, Route, Link } from 'react-router';
import {Button,Menu, Icon,Input, Layout} from 'antd';
import BaseComponent from './baseComponent';

export default class Side extends BaseComponent {
    constructor(props){
        super(props)
        this.state = {
            sortUsers: []
        }
    }
    componentDidMount(){
        fetch('/api/sortUsers',{
            method: 'GET'
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取排名失败')
            }
        }).then(json=>{
            this.setState({
                sortUsers: json
            })
        })
    }
    render(){
        const {user,postsHaveNoComment,isOther} = this.props;
        return (
            <div>
                <div style={{backgroundColor:'white',marginBottom:'10px'}}>
                    <h4 style={{backgroundColor:'#f6f6f6'}}>
                        {
                            isOther ? <div style={{padding:'10px'}}>作者信息</div> : <div style={{padding:'10px'}}>用户信息</div>
                        }
                    </h4>
                    <div style={{padding:'8px'}}>
                        {
                            (user.name || isOther) &&  <div><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501776660441&di=2c21702500b421807c941569ec4de133&imgtype=0&src=http%3A%2F%2Fwww.qq745.com%2Fuploads%2Fallimg%2F141227%2F1-14122H11147.jpg" style={{height:'80px'}}></img>                        <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>                
                            <br/> 
                            <span style={{color:'red'}}>积分:</span> {user.score}
                            <br/>
                            <span>"这天气也太热了吧"</span></div>
                        }
                        {
                          (!isOther && !user.name) && <Button type="primary"><Link to="/logIn">登录</Link></Button>
                        }
                        
                    </div>
                </div>
                <div style={{backgroundColor:'white',height:'180px',marginBottom:'10px',overflow:'hidden'}}>
                    <div style={{backgroundColor:'#f6f6f6',padding:'10px'}}>无人回复的话题</div>
                    <div style={{padding:'8px'}}>
                        {
                            postsHaveNoComment.length === 0 && <span>暂无</span>
                        }
                        <ul>
                            {
                                postsHaveNoComment.map((post,i)=>
                                    <li key={i} >
                                    <Link className="link" to={"/item/" + post.flag} >{post.title}
                                    </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div style={{backgroundColor:'white',height:'180px',overflow:'hidden',marginBottom:'10px'}}>
                    <div style={{backgroundColor:'#f6f6f6',padding:'10px'}}>积分榜</div>
                    <div style={{padding:'8px'}}>
                    <ul>
                        {
                            this.state.sortUsers.map((user,i)=><li key={i}>{user.name}: {user.score}</li>)
                        }
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Side.PropTypes = {
    user: PropTypes.object.isRequired,
    postsHaveNoComment: PropTypes.array.isRequired,
    isOther: PropTypes.bool.isRequired    
}