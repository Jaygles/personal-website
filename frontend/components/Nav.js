import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import User from './User';
import { TOGGLE_MODAL_MUTATION } from './Modal';
import Signout from './Signout';

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <nav className="navbar" role="navigation" aria-label="main-navigation">
            <div className="container">
              <div className="navbar-brand">
                <a href="#" className="navbar-item">
                  Hey
                </a>
              </div>
              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <a href="#" className="navbar-item">
                    Item
                  </a>
                </div>
                <div className="navbar-end">
                  <a href="#" className="navbar-item">
                    Item
                  </a>
                  <div className="navbar-item">
                    <div className="buttons">
                      {!me && (
                        <>
                          <Mutation
                            mutation={TOGGLE_MODAL_MUTATION}
                            variables={{ modal: 'Signin' }}
                          >
                            {toggleModal => (
                              <a href="#" onClick={toggleModal} className="button is-primary">
                                Sign In
                              </a>
                            )}
                          </Mutation>
                          <Mutation
                            mutation={TOGGLE_MODAL_MUTATION}
                            variables={{ modal: 'Signup' }}
                          >
                            {toggleModal => (
                              <a href="#" onClick={toggleModal} className="button is-primary">
                                Sign Up
                              </a>
                            )}
                          </Mutation>
                        </>
                      )}
                      {me && <Signout />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </User>
    );
  }
}

export default Nav;
