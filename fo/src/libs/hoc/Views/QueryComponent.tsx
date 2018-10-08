import * as React from "react";
import { Query } from "react-apollo";

import { IQueryProps } from "../";

import { Error } from "../../../components/layout";
import { Loading } from "../../../components/layout";

/**
 * Query component
 * Query a apollo GraphqlQL API
 */
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
            {({ loading, error, data, fetchMore, client }: any): any => {
                if (loading) { return <Loading /> };
                if (error) { return <Error error={error} /> };
                
                if (children) {
                    return <React.Fragment>
                        {children({ data, fetchMore, client })}
                    </React.Fragment>
                }
                return [];

            }}
        </Query>
    }
}