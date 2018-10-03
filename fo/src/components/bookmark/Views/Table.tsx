import { Button, Typography, withStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SaveIcon from '@material-ui/icons/Save';
import * as React from "react";
import { Link } from 'react-router-dom';
import { BookmarksQuery } from "..";
import { Bookmark } from "../../../schema";
import { IQueryResponse, Table } from "../../hoc";
import Styles from "../../layout/styles";
import { ComponentsPathEnum } from '../../workflow';
import { IListViewProps } from '../types';
import { Row } from './Row';

const AddLink = (props: {}) => {
    return <Link to={ComponentsPathEnum.BOOKMARK_FORM} {...props}/>
}
class BookmarkList extends React.Component<IListViewProps, {}> {
    public render() {
        const { classes } = this.props;
        return <React.Fragment>
            <Typography variant="display1" gutterBottom={true} component="h2">
                Bookmarks
      </Typography>
            <Button 
                component={AddLink} 
                variant="contained" 
                size="small" 
                color="secondary" 
                mini={true} 
                className={classes.button}
                style={{
                    float: "right"
                }}>
                <SaveIcon className={classes.leftIcon} />
                Add bookmark
      </Button>
            <div className={classes.tableContainer}>
                <Table query={BookmarksQuery} limit={5}>
                    {({ data }: IQueryResponse) => {
                        const { results } = data;
                        return <React.Fragment>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
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