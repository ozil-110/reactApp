import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import Picker from './Picker';
import Posts from './Posts';
import Side from './Side';
import {selectAuthor,fetchPostsIfNeeded,invalidatePosts,fetchItem} from '../actions/actions';
import { Spin ,Button,Menu, Icon,Input, Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Row, Col } from 'antd';
import BaseComponent from './baseComponent';

class List extends BaseComponent {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    componentDidMount(){
        const {dispatch,selectedAuthor} = this.props;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.selectedAuthor !== this.props.selectedAuthor){
            console.log('加载新的subreddit');
            const {dispatch,selectedAuthor} = nextProps;
            dispatch(fetchPostsIfNeeded(selectedAuthor));
        }
    }
    handleChange(nextAuthor){
        this.props.dispatch(selectAuthor(nextAuthor));
    }
    handleRefreshClick(e) {
        e.preventDefault();
        const { dispatch, selectedAuthor } = this.props;
        dispatch(invalidatePosts(selectedAuthor));
        dispatch(fetchPostsIfNeeded(selectedAuthor));
    }
    handleShow(id){
        const {dispatch} = this.props;
        dispatch(fetchItem(id));
    }
    render(){
        const { item,selectedAuthor, params,posts, isFetching, lastUpdated,user} = this.props;
        let realPosts = params.author===undefined?posts:posts.filter((post)=>post.author===params.author);
        let postsHaveNoComment = realPosts.filter((post)=>post.discussion.length === 0);
        return (
            <div>
                <Layout>
                    <Content style={{marginRight:'20px'}}>
                        <div>
                            <p>
                            {lastUpdated &&
                                <span>
                                 {new Date(lastUpdated).toLocaleTimeString()}.
                                {' '}
                                </span>
                            }
                            {!isFetching &&
                                <a href='#'
                                onClick={this.handleRefreshClick}>
                                刷新
                                </a>
                            }
                            </p>
                            {isFetching &&
                            <Spin/>
                            }
                            {!isFetching && realPosts.length === 0 &&
                            <h2>Empty.</h2>
                            }
                            {realPosts.length > 0 &&
                            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                                <Posts posts={realPosts} onShow={this.handleShow}/>
                            </div>
                            }
                        </div>
                    </Content>
                    <Sider width="300" style={{backgroundColor:"#EDEDED",marginTop:'20px'}}>
                        <Side user={user} postsHaveNoComment={postsHaveNoComment}/>
                    </Sider>
                </Layout>
            </div>
        )
    }
}

List.PropTypes = {
    selectAuthor: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  const { selectedAuthor, postsByAuthor, item, user } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    isFetching: true,
    items: []
  }
  return {
    selectedAuthor,
    posts: posts||[],
    isFetching,
    lastUpdated,
    item,
    user
  }
}
export default connect(mapStateToProps)(List);