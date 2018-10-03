import { ApolloProvider } from "react-apollo";
import { Workflow }from "./components/workflow";

import Client from "./schema/client";

import * as React from 'react';

import './App.css';

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
