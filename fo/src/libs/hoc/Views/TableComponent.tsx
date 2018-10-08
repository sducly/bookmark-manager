import * as React from "react";

import { Table, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import { ApolloQueryResult } from "apollo-boost";
import { Query } from "../";
import { IQueryResponse, ITableProps } from "../";
import TablePaginationComponent from "./TablePaginationComponent";

/**
 * Table Component
 * Query data from Graphql API
 */
export default class TableComponent extends React.Component<ITableProps, {toolbarData: {}}>  {

  private fetch?: (T: any) => Promise<ApolloQueryResult<any>>;
  private page: number = 1;

  constructor(props: ITableProps) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleToolbarChange = this.handleToolbarChange.bind(this);
    this.reload = this.reload.bind(this);

    this.state = {
      toolbarData: {}
    }

  }

  public render() {
    const v = {...this.props.variables, limit: this.props.limit};
    return <Query query={this.props.query} variables={v}>
      {({ data, fetchMore }: IQueryResponse): any => {
        
        const children: any = this.props.children;
        this.fetch = fetchMore;

        return <React.Fragment>
          {this.renderToolbar()}
          <Table>

          {children({ data }, this.reload)}

          {/* FOOTER */}
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

        </React.Fragment>
      }}
    </Query>
  }

  /**
   * Display toolbar if defined
   */
  private renderToolbar() {
    if(this.props.toolbar) {
      const Toolbar = this.props.toolbar;
      return <form id="table-toolbar" onChange={this.handleToolbarChange}>
          <Toolbar {...this.state.toolbarData} onChange={this.handleToolbarChange}/>
      </form>
    }
    return;
  }

  /**
   * Manage form change on Toolbar
   * @param e FormEvent
   */
  private handleToolbarChange(e: React.SyntheticEvent) {
    const input: HTMLInputElement = e.target as HTMLInputElement;
    const data = this.state.toolbarData;

    if (!data.hasOwnProperty(input.name)) {
      data[input.name] = null;
    }

    data[input.name] = input.value;
    this.setState({
      toolbarData: data
    })
    this.handleChangePage(event, this.page);
  }

  private reload() {
    this.handleChangePage(null, this.page);
  }


  /**
   * Handle page change. Fetch data for the new page
   */
  private handleChangePage = (event: any, page: any) => {
    this.page = page;

    if (typeof this.fetch !== "function") {
      return;
    }

    const variables = {...this.state.toolbarData, limit: this.props.limit,page: this.page};

    this.fetch({
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return fetchMoreResult;

      },
      variables
    });


  };

}


