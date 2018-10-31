import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Post from './Post';
import Pagination from './Pagination';
import { perPage } from '../config';

const PostsContainer = styled.div`
  margin-top: 3rem;
`;

const PostsStyles = styled.section`
  margin: 3rem 4rem 0 4rem;
  display: flex;
  flex-direction: column;
`;

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    posts(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;

class Posts extends Component {
  render() {
    return (
      <PostsContainer className="columns is-centered">
        <PostsStyles className="column">
          <Query
            query={ALL_POSTS_QUERY}
            // fetchPolicy="network-only"
            variables={{
              skip: this.props.page * perPage - perPage,
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <>
                  {data.posts.map(post => (
                    <Post post={post} key={post.id} />
                  ))}
                </>
              );
            }}
          </Query>
          <Pagination page={this.props.page} />
        </PostsStyles>
      </PostsContainer>
    );
  }
}

export default Posts;
