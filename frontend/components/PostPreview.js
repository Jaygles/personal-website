import React, { Component } from 'react';
import formatDate from '../lib/formatDate';

class PostPreview extends Component {
  render() {
    const { title, content, me } = this.props;
    return (
      <div className="columns">
        <div className="column is-8 is-offset-2 content">
          <h2>{title === '' ? 'Title' : title}</h2>
          <p>By {me.name}</p>
          <p>{formatDate(new Date())}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

export default PostPreview;
