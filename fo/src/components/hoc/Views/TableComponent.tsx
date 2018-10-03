import * as React from "react";

import { Table, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import { ApolloQueryResult } from "apollo-boost";
import { Query } from "../";
import { IPaginateProps, IQueryResponse } from "../";
import TablePaginationComponent from "./TablePaginationComponent";


export default class TableComponent extends React.Component<IPaginateProps, {}>  {

  private fetch?: (T:any) => Promise<ApolloQueryResult<any>>;
  private page: number = 1;

  constructor(props: IPaginateProps) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  public render() {
    return <Query query={this.props.query} variables={{
      limit: this.props.limit
      }}>
      {({ data, fetchMore }: IQueryResponse): any => {
        const children: any = this.props.children;
        this.fetch = fetchMore;

        return <Table>
          {children({ data })}
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={9}
                count={data.count}
                rowsPerPage={this.props.limit}
                rowsPerPageOptions={[this.props.limit]}
                page={this.page - 1}
                onChangePage={this.handleChangePage}
                ActionsComponent={TablePaginationComponent}
              />
            </TableRow>
          </TableFooter>
        </Table>

      }}
    </Query>
  }

  private handleChangePage = (event: any, page: any) => {
    this.page = page;

    if (typeof this.fetch !== "function") {
      return;
    }

    this.fetch({
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return fetchMoreResult;
        
      },
      variables: {
        limit: this.props.limit,
        page: this.page
      }

    });

    
  };

}


