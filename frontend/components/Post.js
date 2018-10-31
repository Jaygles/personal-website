import React, { Component } from 'react';
import styled from 'styled-components';
import formatDate from '../lib/formatDate';

const PostStyles = styled.div`
  width: 100%;
  padding: 0 2rem;

  .post-title {
    margin-bottom: 0.5rem;
    font-size: 3.4rem;
    font-weight: 800;
  }

  .post-author {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .post-date {
    margin-bottom: 1rem;
    font-size: 0.8rem;
    color: #b5b5b5;
  }

  .post-content {
    p {
      margin: 1rem 0;
      font-size: 1.1rem;
      text-align: justify;
    }
  }
`;

class Post extends Component {
  render() {
    console.log(this.props.post);
    return (
      <PostStyles>
        <h2 className="post-title">{this.props.post.title}</h2>
        <p className="post-author">By {this.props.post.user.name}</p>
        <p className="post-date">{formatDate(new Date())}</p>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        />
      </PostStyles>
    );
  }
}

export default Post;
