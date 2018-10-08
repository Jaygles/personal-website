import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import draftToHtml from '../lib/draftjs-to-html';
import StyleButton from './StyleButton';
import Error from './ErrorMessage';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
    }
  }
`;

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    editorState: EditorState.createEmpty(),
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
    this.props.setPreviewState(e.target.value, this.state.content);
  };

  handleChange = editorState => {
    this.setState({ editorState });
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    this.setState({ content: markup });
    this.props.setPreviewState(this.state.title, markup);
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  focus = () => this.refs.editor.focus();

  mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  toggleBlockType = blockType => {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_POST_MUTATION}
        variables={{ title: this.state.title, content: this.state.content }}
      >
        {(createPost, { loading, error }) => (
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <Error error={error} />
              <div className="RichEditor-root content">
                <fieldset>
                  <div className="field">
                    <label htmlFor="title" className="label content">
                      Title
                    </label>
                    <div className="control">
                      <input
                        value={this.state.title}
                        onChange={e => this.handleTitleChange(e)}
                        id="title "
                        type="text"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="content" className="label">
                      Content
                    </label>

                    <div className="control">
                      <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                      />
                      <InlineStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleInlineStyle}
                      />
                      <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={this.state.editorState}
                        onChange={this.handleChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button
                        className={loading ? 'button is-primary is-loading' : 'button is-primary'}
                        id="create-post"
                        onClick={async e => {
                          e.preventDefault();
                          const res = await createPost();
                          console.log(res);
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;
