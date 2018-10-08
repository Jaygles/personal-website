import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import { TOGGLE_MODAL_MUTATION } from './Modal';

const FieldsetStyles = styled.fieldset`
  border: none;
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Mutation mutation={TOGGLE_MODAL_MUTATION} variables={{ activeModal: null }}>
            {toggleModal => (
              <form
                className="content"
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await signin();
                  this.setState({ name: '', email: '', password: '' });
                  toggleModal();
                }}
              >
                <FieldsetStyles className="box" disabled={loading} aria-busy={loading}>
                  <h2>Sign into your account</h2>
                  <Error error={error} />
                  <div className="field">
                    <label className="label" htmlFor="email">
                      Email
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.saveToState}
                      />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="password">
                      Password
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.saveToState}
                      />
                    </label>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-primary" type="submit">
                        Sign In!
                      </button>
                    </div>
                  </div>
                </FieldsetStyles>
              </form>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default Signin;
