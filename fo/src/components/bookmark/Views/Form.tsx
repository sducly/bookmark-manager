import * as React from "react";

import { Button, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IBookmarkFormProps } from "../";
import { Bookmark } from "../../../schema";
import { Form, InputWidget } from "../../hoc";
import { BookmarkQuery, UpdateBookmark } from "../queries";
import { getPicturesInfo, getVideoInfo } from "../services";

export default class BookmarkForm extends React.Component<IBookmarkFormProps, { _bookmark: any, initialize: boolean }> {
    constructor(props: IBookmarkFormProps) {
        super(props);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.state = {
            _bookmark: {},
            initialize: false
        }
    }

    public render() {
        const urlParams = this.props.match.params as { id: number };
        return <Form query={BookmarkQuery} mutation={UpdateBookmark} variables={{ id: urlParams.id }}>
            {(result: Bookmark) => {
                const bookmark = (result) ? result : new Bookmark();

                const MergeBookmark = { ...bookmark, ...this.state._bookmark };

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
                        <Grid container={true} spacing={24}>

                            <Grid item={true} xs={12}>
                                <InputWidget name="_tempUrl" defaultValue={MergeBookmark.url} label="Url" onChange={this.handleChangeUrl} />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <InputWidget name="title" defaultValue={MergeBookmark.title} label="Title" key={this.state._bookmark.title} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="authorName" defaultValue={MergeBookmark.authorName} label="Author name" key={this.state._bookmark.authorName} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="addedDate" defaultValue={MergeBookmark.addedDate} label="Created" key={this.state._bookmark.addedDate} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="width" defaultValue={MergeBookmark.width} label="Width" key={this.state._bookmark.width} />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <InputWidget name="height" defaultValue={MergeBookmark.height} label="Height" key={this.state._bookmark.height} />
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
                            <Grid item={true} xs={12} style={{
                                display: "none"
                            }}>
                                <InputWidget label="hidden" name="thumbUrl" defaultValue={MergeBookmark.thumbUrl} key={this.state._bookmark.thumbUrl} />
                                <InputWidget required={false} label="hidden" name="id" defaultValue={(MergeBookmark.id) ? MergeBookmark.id : 0} />
                                <InputWidget label="hidden" name="type" defaultValue={MergeBookmark.type} key={this.state._bookmark.type} />
                                <InputWidget label="hidden" name="url" defaultValue={MergeBookmark.url} key={this.state._bookmark.url}/>
                            </Grid>
                        </Grid>
                    </Paper>
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
        // tslint:disable-next-line:no-console
        console.log(data);
        this.setState({
            _bookmark: data
        })
    }
}