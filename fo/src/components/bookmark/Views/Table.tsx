import { Typography, withStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from "react";
import { BookmarksQuery, BookmarkToolbar } from "..";
import { Bookmark } from "../../../schema";
import { IQueryResponse, Table } from "../../hoc";
import Styles from "../../layout/styles";
import { IListViewProps } from '../types';
import { Row } from './Row';

class BookmarkList extends React.Component<IListViewProps, {}> {
    public render() {
        const { classes } = this.props;
        return <React.Fragment>
            <Typography variant="display1" gutterBottom={true} component="h2">
                Bookmarks
      </Typography>
            
            <div className={classes.tableContainer}>
                <Table query={BookmarksQuery} limit={5} toolbar={BookmarkToolbar}>
                    {({ data }: IQueryResponse) => {
                        const { results } = data;
                        return <React.Fragment>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Thumb</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Add date</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((b: Bookmark) => {
                                    return <Row bookmark={b} key={'boomark_row_' + b.id} />
                                })}
                            </TableBody>
                        </React.Fragment>
                    }}
                </Table>
            </div>
        </React.Fragment>;
    };
}

export default withStyles(Styles as any)(BookmarkList);