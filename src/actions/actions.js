import config from '../constant/config';
import fetch from 'isomorphic-fetch';
import {REQUEST_POSTS,RECEIVE_POSTS,INVALIDATE_POSTS,
SELECT_AUTHOR,FETCH_ITEM,REQUEST_USER,RECEIVE_USER,LOG_IN,LOG_OUT} from '../constant/ActionTypes';

function requestUser() {
    return {
        type: REQUEST_USER
    }
}
function recieveUser(user){
    return {
        type: RECEIVE_USER,
        user
    }
}
//获取用户
export function fetchUser(){
    const token = localStorage.getItem('token');
    if(!token){
        return (dispatch)=>{
            return dispatch(recieveUser({}))
        }
    }
    return (dispatch)=>{
        const content = JSON.stringify({
                access_token: token
            })
        return fetch(`http://${config.serverip}:${config.serverport}/api/user`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取用户失败')
            }
        }).then(json=>{
            dispatch(recieveUser(json))
        })
    }
}
//登录
export function logIn(user){
    return {
        type: LOG_IN,
        user
    }
}
//登出
export function logOut(){
    return {
        type: LOG_OUT
    }
}
function receiveItem(json){
    return {
        type: FETCH_ITEM,
        item: json.data
    }
}
export function selectAuthor(author){
    return {
        type: SELECT_AUTHOR,
        author
    }
}
//获取post详情
export function fetchItem(id){
    return dispatch=>{
        return fetch(`/api/detail/?id=${id}`)
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            dispatch(receiveItem(json))
        })
    }
}
export function invalidatePosts(author){
    return {
        type: INVALIDATE_POSTS,
        author
    }
}
//获取posts
function shouldFetchPosts(state,author){
    if(!state.postsByAuthor[author]){
        return true;
    } else {
        const posts = state.postsByAuthor[author];
        if(posts.isFetching) {
            return false;
        } else {
            return posts.didInvalidate;
        }
    }
}
function requestPosts(author){
    return {
        type: REQUEST_POSTS,
        author
    }
}
function receivePosts(author,json){
    return {
        type: RECEIVE_POSTS,
        author,
        posts: json,
        receivedAt: Date.now()
    }
}
function fetchPosts(author){
    return dispatch=>{
        dispatch(requestPosts(author))
        return fetch(`http://${config.serverip}:${config.serverport}/api/post?author=${author}`)
            .then(response=>response.json())
            .then(json=>dispatch(receivePosts(author,json)))
    }
}
export function fetchPostsIfNeeded(author){
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),author)){
            return dispatch(fetchPosts(author))
        }
    }
}