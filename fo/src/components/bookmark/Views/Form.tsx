import * as React from "react";

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IBookmarkFormProps } from "../";
import { Bookmark } from "../../../schema";
import { Form, HiddenWidget, InputWidget } from "../../hoc";
import { ComponentsPathEnum } from "../../workflow";
import { BookmarkQuery, UpdateBookmark } from "../queries";
import { getPicturesInfo, getVideoInfo } from "../services";
import { IApiResult } from "../types";

export default class BookmarkForm extends React.Component<IBookmarkFormProps, { redirectUrl: null | string, apiResult: IApiResult, initialize: boolean }> {
    constructor(props: IBookmarkFormProps) {
        super(props);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);

        this.state = {
            apiResult: {
                addedDate: "",
                authorName: "",
                height: 0,
                id: this.props.match.id,
                thumbUrl: "",
                title: "",
                type: null,
                url: "",
                width: 0
            },
            initialize: false,
            redirectUrl: null
        }
    }

    public render() {
        const urlParams = this.props.match.params as { id: number };
        return <Form query={BookmarkQuery} mutation={UpdateBookmark} variables={{ id: urlParams.id }} redirectUrl={ComponentsPathEnum.HOME}>
            {(result: Bookmark) => {
                const bookmark = (result) ? result : new Bookmark();

                let MergeBookmark = bookmark as any;

                if (this.state.apiResult.thumbUrl) {
                    MergeBookmark = { ...bookmark, ...this.state.apiResult };
                }

                return <React.Fragment>
                    <Typography variant="title" gutterBottom={true}>
                        {MergeBookmark.id > 0 ? "Edit Bookmark" : "Add Bookmark"}
                    </Typography>
                    <Paper style={{
                        margin: "auto",
                        marginTop: 30,
                        maxWidth: 700,
                        padding: 20,
                        width: "calc(100%-40px)"

                    }}>
                        <Grid container={true} spacing={24} id="form-grid-container">

                            <Grid item={true} xs={12}>
                                <InputWidget name="_tempUrl" defaultValue={MergeBookmark.url} label="Url" onChange={this.handleChangeUrl} />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <InputWidget name="title" defaultValue={MergeBookmark.title} label="Title" key={this.state.apiResult.title} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="authorName" defaultValue={MergeBookmark.authorName} label="Author name" key={this.state.apiResult.authorName} />
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
                                    key={this.state.apiResult.addedDate}/>
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="width" defaultValue={MergeBookmark.width} label="Width" key={this.state.apiResult.width} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="height" defaultValue={MergeBookmark.height} label="Height" key={this.state.apiResult.height} />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <img src={MergeBookmark.thumbUrl} />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="raised"
                                    color="primary">
                                    Ok
            </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <HiddenWidget name="thumbUrl" value={MergeBookmark.thumbUrl} />
                    <HiddenWidget name="id" value={(MergeBookmark.id) ? MergeBookmark.id : 0} />
                    <HiddenWidget name="type" value={MergeBookmark.type} />
                    <HiddenWidget name="url" value={MergeBookmark.url} />
                    <HiddenWidget name="userId" value={this.props.user.id} />
                </React.Fragment>

            }}
        </Form>;
    }

    private getProvider(url: string) {
        return (url.match('flickr')) ? getPicturesInfo : getVideoInfo;
    }

    private async handleChangeUrl(e: any) {
        const input = e.target;
        const url = input.value;

        if (!url) {
            return;
        }

        const apiData = this.getProvider(url);
        const data = await apiData(url);

        this.setState({
            apiResult: data
        })
    }
}