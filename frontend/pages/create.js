import React, { Component } from 'react';
import CreatePost from '../components/CreatePost';
import PostPreview from '../components/PostPreview';
import User from '../components/User';

class create extends Component {
  state = {
    title: '',
    content: '',
  };

  setPreviewState = (title, content) => {
    this.setState({ title, content });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3 content has-text-centered">
                <h1>Create A Post</h1>
              </div>
            </div>
            <CreatePost me={me} setPreviewState={this.setPreviewState} />
            <PostPreview
              me={me}
              title={this.state.title}
              content={this.state.content}
            />
          </div>
        )}
      </User>
    );
  }
}

export default create;
