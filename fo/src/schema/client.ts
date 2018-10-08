import ApolloClient from "apollo-boost";

/**
 * ApolloClient
 */
const Client = new ApolloClient({
    uri: process.env.REACT_APP_API_URI
});

export default Client;