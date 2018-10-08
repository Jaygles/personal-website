import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Signin from './Signin';
import Signup from './Signup';

const LOCAL_STATE_QUERY = gql`
  query {
    modalOpen @client
    activeModal @client
  }
`;

const TOGGLE_MODAL_MUTATION = gql`
  mutation TOGGLE_MODAL_MUTATION($modal: String!) {
    toggleModal(modal: $modal) @client
  }
`;

class Modal extends Component {
  render() {
    return (
      <Query query={LOCAL_STATE_QUERY}>
        {localState => {
          const modalClasses = localState.data.modalOpen ? 'modal is-active' : 'modal';
          let activeModal = <Signin />;
          switch (localState.data.activeModal) {
            case 'Signin':
              activeModal = <Signin />;
              break;
            case 'Signup':
              activeModal = <Signup />;
              break;
            default:
              break;
          }
          return (
            <Mutation mutation={TOGGLE_MODAL_MUTATION} variables={{ activeModal: null }}>
              {toggleModal => (
                <div className={modalClasses}>
                  <div onClick={toggleModal} className="modal-background" />
                  <div className="modal-card">{activeModal}</div>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="modal-close is-large"
                    aria-label="close"
                  />
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Modal;
export { LOCAL_STATE_QUERY, TOGGLE_MODAL_MUTATION };
