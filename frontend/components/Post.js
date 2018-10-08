import React, { Component } from 'react';
import formatDate from '../lib/formatDate';

class Post extends Component {
  render() {
    return (
      <div className="content">
        <h2>{this.props.post.title}</h2>
        <p>{this.props.post.user.name}</p>
        <p>{formatDate(new Date())}</p>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
      </div>
    );
  }
}

export default Post;
