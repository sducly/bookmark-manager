import { Button, TableCell, TableRow } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import * as moment from "moment";
import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import { Bookmark } from "../../../schema";
import { ComponentsPathEnum } from "../../workflow";

export const Row = ({ bookmark }: { bookmark: Bookmark }) => {
    const editUrl = generatePath(ComponentsPathEnum.BOOKMARK_FORM, {
        id: bookmark.id
    });
    return <TableRow>
        <TableCell>{bookmark.id}</TableCell>
        <TableCell>
            <img src={bookmark.thumbUrl} style={{
                width: "80px"
            }}/>
        </TableCell>
        <TableCell>{bookmark.title}</TableCell>
        <TableCell>{bookmark.authorName}</TableCell>
        <TableCell>{moment(bookmark.addedDate).format('L')}</TableCell>
        <TableCell numeric={true}>
            <Link to={editUrl}>
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