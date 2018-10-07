import ApolloClient from "apollo-boost";

const Client = new ApolloClient({
    uri: process.env.REACT_APP_API_URI
});

export default Client;