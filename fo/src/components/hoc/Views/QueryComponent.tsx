import * as React from "react";
import { Query } from "react-apollo";

import { IQueryProps } from "../";

import { Error } from "../../layout";
import { Loading } from "../../layout";


export default class QueryComponent extends React.Component<IQueryProps, {}>  {

    public render() {
        const { query, children, variables } = this.props;

        if (!query) {
            if (children) {
                return <div>
                    {children({})}
                </div>
            }
            return [];
        }

        return <Query query={query} variables={variables}>
            {({ loading, error, data, fetchMore }: any): any => {
                if (loading) { return <Loading /> };
                if (error) { return <Error error={error} /> };

                if (children) {
                    return <React.Fragment>
                        {children({ data, fetchMore })}
                    </React.Fragment>
                }
                return [];

            }}
        </Query>
    }
}