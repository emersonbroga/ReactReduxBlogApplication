import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
    .then( () => {
      // blog post has been created, navigate the user to the index.
      // we navigate by calling this.context.router.push with the 
      // new path to navigate to.
      this.context.router.push('/');
    });
  }

  render() {
    
    const { fields: { title, categories, content}, handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          
          <h3>Create a new Post</h3>
         
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" {...title} />
            <div className="text-help text-danger">{title.touched ? title.error : ''}</div>
          </div>
          
          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" {...categories} />
            <div className="text-help text-danger">{categories.touched ? categories.error : ''}</div>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" {...content} />
            <div className="text-help text-danger">{content.touched ? content.error : ''}</div>
          </div>
          
          <Link to="/" className="btn btn-danger" >Cancel</Link>

          <button type="submit" className="btn btn-primary">Submit</button>
        
        </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title are required.';
  }
  if (!values.categories) {
    errors.categories = 'Categories are required.';
  }
  if (!values.content) {
    errors.content = 'Content is required.';
  }

  return errors;
}

//connect: first argument is mapsStateToProps, 2nd is mapDispatchToProps
// reduxForm: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
},null, { createPost })(PostsNew);