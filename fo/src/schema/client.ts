import ApolloClient from "apollo-boost";

const Client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

export default Client;