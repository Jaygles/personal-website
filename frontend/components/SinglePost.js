import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';
import Post from './Post';

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(where: { id: $id }) {
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

class SinglePost extends Component {
  render() {
    return (
      <Query
        query={SINGLE_POST_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.post) return <p>No Post Found for {this.props.id}</p>;
          const post = data.post;
          return (
            <div>
              <Head>
                <title>Jay Sully | {post.title}</title>
              </Head>
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <Post post={data.post} />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SinglePost;
export { SINGLE_POST_QUERY };
