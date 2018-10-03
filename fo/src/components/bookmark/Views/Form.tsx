import * as React from "react";

import { BookmarksQuery } from "../";
import { IBookmarkFormProps } from "../";
import { Bookmark } from "../../../schema";
import { Form } from "../../hoc";

export default class BookmarkForm extends React.Component<IBookmarkFormProps, {}> {
    public render() {
        const urlParams = this.props.match.params as { id:number };
        return <Form query={BookmarksQuery} mutation={BookmarksQuery} variables={{id: urlParams.id}}>
            {({getBookmark}: { getBookmark: Bookmark}) => {
                return <React.Fragment/>
            }}
        </Form>;
    }
}