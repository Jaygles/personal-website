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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Mutation mutation={TOGGLE_MODAL_MUTATION} variables={{ activeModal: null }}>
            {toggleModal => (
              <form
                className="content"
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await signup();
                  if (res) {
                    this.setState({ name: '', email: '', password: '' });
                    toggleModal();
                  }
                }}
              >
                <FieldsetStyles className="box" disabled={loading} aria-busy={loading}>
                  <h2>Sign Up for An Account</h2>
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
                    <label className="label" htmlFor="name">
                      Name
                      <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
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
                      <button
                        className={loading ? 'button is-primary is-loading' : 'button is-primary'}
                        type="submit"
                      >
                        Sign Up!
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

export default Signup;
export { SIGNUP_MUTATION };
