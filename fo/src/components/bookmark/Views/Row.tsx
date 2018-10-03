import { Button, TableCell, TableRow } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "../../../schema";
import { ComponentsPathEnum } from "../../workflow";

export const Row = ({ bookmark }: { bookmark: Bookmark }) => {
    return <TableRow>
        <TableCell>{bookmark.id}</TableCell>
        <TableCell>{bookmark.title}</TableCell>
        <TableCell>{bookmark.authorName}</TableCell>
        <TableCell>{moment(bookmark.addedDate).format('L')}</TableCell>
        <TableCell numeric={true}>
            <Link to={ComponentsPathEnum.BOOKMARK_FORM}>
                <Button mini={true} color="primary">
                    <EditIcon />
                </Button>
            </Link>

            <Button href={bookmark.url} target="_blank" aria-label="Delete" mini={true} color="primary">
                <LinkIcon />
            </Button>
        </TableCell>
    </TableRow>
}