import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import './App.css';
import { Workflow } from "./components/workflow";
import Client from "./schema/client";

class App extends React.Component {

  public render() {
    return (
      <ApolloProvider client={Client}>
          <Workflow />
      </ApolloProvider>
    );
  }
}

export default App;
