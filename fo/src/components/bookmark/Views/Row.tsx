import { Button, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import * as moment from "moment";
import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import { AlertDialog } from "../../../libs/hoc";
import { Bookmark, Client } from "../../../schema";
import { ComponentsPathEnum } from "../../workflow";
import { DeleteBookmark } from "../queries";

const handleDelete = async ({ id, reload }: any): Promise<boolean> => {
    const result: any = await Client.mutate({
        mutation: DeleteBookmark,
        variables: {
            id
        }
    });

    reload();

    return result.data.delete;
};

const ButtonStyle = {
    height: 30,
    margin: 5,
    minHeight: 30,
    width: 30
};

export const Row = ({ bookmark, reload }: { bookmark: Bookmark, reload: () => void }) => {

    const editUrl = generatePath(ComponentsPathEnum.BOOKMARK_FORM, {
        id: bookmark.id
    });
    return <TableRow>
        
        <TableCell>{bookmark.id}</TableCell>
        <TableCell>
            <img src={bookmark.thumbUrl} style={{
                width: "80px"
            }} />
        </TableCell>
        <TableCell>{bookmark.title}</TableCell>
        <TableCell>{bookmark.authorName}</TableCell>
        <TableCell>{moment(bookmark.addedDate).format('L')}</TableCell>

        {/* ACTIONS */}
        <TableCell numeric={true}>
            <div style={{ display: "flex" }}>

                {/* Link to the bookmark url */}
                <Button href={bookmark.url} target="_blank" aria-label="Link" mini={true} color="default" variant={"fab"} style={ButtonStyle}>
                    <LinkIcon style={{ fontSize: 20 }} />
                </Button>

                {/* Edit link */}
                <Link to={editUrl}>
                    <Button mini={true} color="primary" variant={"fab"} style={ButtonStyle}>
                        <EditIcon style={{ fontSize: 20 }} />
                    </Button>
                </Link>

                {/* Delete confirm */}
                <AlertDialog
                    title="Are you sure ?"
                    content="You are about to delete a bookmark. Do you want to continue ?"
                    onConfirm={handleDelete}
                    confirmParams={{
                        id: bookmark.id,
                        reload
                    }}>

                    {(handleConfirm) => (
                        <Button mini={true} color="secondary" onClick={handleConfirm} variant={"fab"} style={ButtonStyle}>
                            <DeleteIcon style={{ fontSize: 20 }} />
                        </Button>
                    )}

                </AlertDialog>
            </div>

        </TableCell>
    </TableRow>
}