import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then(() =>{
      // after deleting the post send the user back to
      // the index page.
      this.context.router.push('/');
    });

  }

  render() {

    const { post } = this.props;

    if(!post) {
      return (
        <div className="post-show loading">
          <div>
            <h3 className="col-xs-10">Loading...</h3>
          </div>
        </div>
      );
    }
    
    return (
      <div className="posts-show">
        <div>
          <h1 className="col-xs-10">{post.title}</h1>
          <button className="btn btn-danger col-sx-2" 
            onClick={ this.onDeleteClick.bind(this) }>
            Delete Post
          </button>
        </div>
        <hr />
        <div className="post-entry col-xs-12">

          <div className="col-xs-12">Categories: <small> {post.categories}</small></div>
          <div className="col-xs-12">
            {post.content}
            <hr />
          </div> 
          <div className="col-xs-12">
            <Link to="/" className="btn btn-primary" >
              Back to index
            </Link>
            
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {post: state.posts.post};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);

