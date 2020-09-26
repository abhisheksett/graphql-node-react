import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

 // This is local state, doesn't exist on server
const typeDefs = gql`
  extend type Pet {
    vacinated: Boolean!
  }
`;

const resolvers = {
  Pet: {
    vacinated: () => true
  }
};

 const link = new HttpLink({
     uri: 'http://localhost:4000/'
 });

 const cache = new InMemoryCache();

 const client = new ApolloClient({
     link,
     cache,
     typeDefs,
     resolvers
 });

 export default client;