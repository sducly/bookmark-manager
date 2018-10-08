import * as React from "react";
import {Error} from "../../layout";

/**
 * 404 Screen
 */
export default class NotFound extends React.Component {
    public render() {
        return <Error error={{
            extraInfo: "",
            graphQLErrors: [],
            message: "Not Found error",
            name: "404",
            networkError: null,
        }}/>
    }
}