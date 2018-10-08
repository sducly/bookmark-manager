import { Grid, TextField } from '@material-ui/core';
import * as React from "react";
import { HiddenWidget, InputWidget, TagsWidget } from "../../../../libs/widgets";
import { Bookmark } from "../../../../schema";
import { IApiResult } from "../../types";

export const BookmarkForm = ({ MergeBookmark, apiResult }: { MergeBookmark: Bookmark, apiResult: IApiResult }) => {
    return <React.Fragment>
        <Grid item={true} xs={12}>
            <InputWidget name="title" defaultValue={MergeBookmark.title} label="Title" key={apiResult.title} />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
            <InputWidget name="authorName" defaultValue={MergeBookmark.authorName} label="Author name" key={apiResult.authorName} />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
            <TextField
                id="addedDate"
                label="Created"
                type="date"
                name="addedDate"
                defaultValue={MergeBookmark.addedDate}
                fullWidth={true}
                InputLabelProps={{
                    shrink: true,
                }}
                key={apiResult.addedDate} />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
            <InputWidget name="width" defaultValue={MergeBookmark.width} label="Width" key={apiResult.width} />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
            <InputWidget name="height" defaultValue={MergeBookmark.height} label="Height" key={apiResult.height} />
        </Grid>

        <Grid item={true} xs={12}>
            <TagsWidget name={"tags"} label={"Tags"} defaultValue={MergeBookmark.tags} key={apiResult.tags} />
        </Grid>

        <HiddenWidget name="thumbUrl" value={MergeBookmark.thumbUrl} />
        <HiddenWidget name="id" value={(MergeBookmark.id) ? MergeBookmark.id : 0} />
        <HiddenWidget name="type" value={MergeBookmark.type} />
        <HiddenWidget name="url" value={MergeBookmark.url} />

    </React.Fragment>
}