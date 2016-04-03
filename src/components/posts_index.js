import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';


class PostsIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if (this.props.posts.length === 0){
      return (
        <div>There's no posts for you yet, do you want to <Link to="/posts/new" className="" >create a new one</Link>?</div>
      );
    }

    return this.props.posts.map((post) => {
      return(
        <div className="post-entry" key={post.id} >
          <Link to={"posts/" + post.id}>
            <h4>{post.title}</h4>
          </Link>
          <p>Categories: <small> {post.categories}</small></p>
          <hr />
        </div>

      );
    });
  }

  render() {
    return (
      <div className="posts-index">
        <div>
          <h1 className="col-xs-10">The Awesome React+Redux Blog</h1>
          <Link to="/posts/new" className="btn btn-primary col-sx-2" >
            Create Post
          </Link>
        </div>
        <hr />
        <div className="posts-list col-xs-12">
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts.all};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);