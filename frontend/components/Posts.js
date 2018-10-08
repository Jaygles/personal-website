import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Post from './Post';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    posts(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      content
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
      <div className="columns is-centered">
        <div className="column is-narrow">
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
                <div>
                  {data.posts.map(post => (
                    <Post post={post} key={post.id} />
                  ))}
                </div>
              );
            }}
          </Query>
          <Pagination page={this.props.page} />
        </div>
      </div>
    );
  }
}

export default Posts;
