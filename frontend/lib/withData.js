import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Modal';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleModal(_, variables, { cache }) {
            const { modalOpen, activeModal } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log(activeModal);
            const data = {
              data: { modalOpen: !modalOpen, activeModal: variables.modal },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        modalOpen: false,
        activeModal: 'Signin',
      },
    },
  });
}

export default withApollo(createClient);
