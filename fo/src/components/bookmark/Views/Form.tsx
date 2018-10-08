import * as React from "react";

import { Button, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IBookmarkFormProps } from "../";
import { Form } from "../../../libs/hoc";
import { HiddenWidget, InputWidget } from "../../../libs/widgets";
import { Bookmark } from "../../../schema";
import Loading from "../../layout/Views/Loading";
import { ComponentsPathEnum } from "../../workflow";
import { BookmarkQuery, UpdateBookmark } from "../queries";
import { getPicturesInfo, getVideoInfo } from "../services";
import { IApiResult } from "../types";
import { BookmarkForm } from "./Includes/BookmarkForm";
import { VideoForm } from "./Includes/VideoForm";

export default class BookmarkFormView extends React.Component<IBookmarkFormProps, { redirectUrl: null | string, apiResult: IApiResult, isLoading: boolean }> {
    constructor(props: IBookmarkFormProps) {
        super(props);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);

        this.state = {
            apiResult: {
                addedDate: "",
                authorName: "",
                height: 0,
                id: this.props.match.id,
                tags: "",
                thumbUrl: "",
                title: "",
                type: null,
                url: "",
                width: 0
            },
            isLoading: false,
            redirectUrl: null
        }
    }

    public render() {
        const urlParams = this.props.match.params as { id: number };

        if (this.state.isLoading) {
            return <Loading />
        }

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

                            {/* Fake url use to fetch data from api */}
                            <Grid item={true} xs={12}>
                                <InputWidget
                                    name="_tempUrl"
                                    defaultValue={MergeBookmark.url}
                                    label="Url"
                                    onChange={this.handleChangeUrl}
                                    helpText={"Please paste a Flickr or Vimeo Url. Samples : https://www.flickr.com/photos/maxjunkyard/18149663983/in/feed | https://vimeo.com/176061168"} />
                            </Grid>

                            <BookmarkForm MergeBookmark={MergeBookmark} apiResult={this.state.apiResult}/>

                            <VideoForm bookmark={MergeBookmark} key={this.state.apiResult.video ? this.state.apiResult.video.duration : "form-duration"} />

                            {/* Preview */}
                            <Grid item={true} xs={12}>
                                <img src={MergeBookmark.thumbUrl} width="100%" />
                            </Grid>
                    
                            {/* Confirm button */}
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

                    <HiddenWidget name="userId" value={this.props.user.id} />

                </React.Fragment>

            }}
        </Form>;
    }

    /**
     * Check if url is valid
     */
    private isValidUrl(url: string) {
        return (!url || url.match('www.flickr.com') || url.match('vimeo.com'));
    }

    /**
     * Return service method to fetch data from url
     * @param url String
     */
    private getProvider(url: string) {
        return (url.match('flickr')) ? getPicturesInfo : getVideoInfo;
    }

    /**
     * Fetch data from api when url change
     * @param e FormEvent
     */
    private async handleChangeUrl(e: any) {
        const input = e.target;
        const url = input.value;

        if (!url || !this.isValidUrl(url)) {
            return;
        }

        this.setState({
            isLoading: true
        });

        const apiData = this.getProvider(url);
        const data = await apiData(url);

        this.setState({
            apiResult: data,
            isLoading: false
        })
    }
}