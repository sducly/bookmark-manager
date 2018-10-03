import * as React from "react";

import { ApolloQueryResult } from "apollo-boost";
import { Query } from "../";
import { IPaginateProps, IQueryResponse } from "../";

export default class PaginateComponent extends React.Component<IPaginateProps, {}>  {

    private fetch?: (T: any) => Promise<ApolloQueryResult<any>>;
    private length: number = this.props.variables.limit;

    constructor(props: IPaginateProps) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);
    }


    public render() {
        return <Query query={this.props.query} variables={this.props.variables}>
            {({ data, fetchMore }: IQueryResponse): any => {

                this.fetch = fetchMore;
                const children: any = this.props.children;
                
                return <div className="paginate-component">
                    {children({data, fetchMore: this.fetchMore})}
                </div>
            }}
        </Query>
    }

    private fetchMore() {

        if (typeof this.fetch !== "function") {
            return;
        }

        this.fetch({
            updateQuery: (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) {
                    return prev;
                }

                const results = {};
                Object.entries(fetchMoreResult).map((props: any) => {
                    const prop: any = props[0];
                    if(prop) {
                        Object.assign(results, {
                            [prop]: [...prev[prop], ...fetchMoreResult[prop]]
                        });
                    }
                    this.length = results[prop].length;
                });

                
                // tslint:disable-next-line:no-console
                console.log(prev, results);
                return results;
            },
            variables: {
                offset: this.length
            }

        });
    }


}