import { Grid } from "@material-ui/core";
import * as React from "react";
import { InputWidget }  from "../../../../libs/widgets";
import { Bookmark, BookmarkTypeEnum } from "../../../../schema";

export const VideoForm = ({bookmark}: {bookmark: Bookmark}) => {
    if(bookmark.type === BookmarkTypeEnum.VIDEO) {
        return <Grid item={true} xs={12}>
            <InputWidget name="duration" defaultValue={bookmark.video ? bookmark.video.duration : 0} label="Duration" />
        </Grid>
    }

    return <React.Fragment/>
}