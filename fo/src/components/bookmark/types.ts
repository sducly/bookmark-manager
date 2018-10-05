import { WithStyles } from "@material-ui/core";
import { match } from "react-router";
import { Bookmark, BookmarkTypeEnum, User } from "../../schema";
import { IFetchMoreProps } from "../hoc";

export interface IListViewProps extends IFetchMoreProps, WithStyles<any> {
    user: any
}

export interface IBookmarkFormProps {
    match: match|any,
    user: User
}

export interface IBookmarkChildrenProps extends IFetchMoreProps{
    data: {
        points: Bookmark[]
    }
}

export interface IApiResult {
        id?: string|number|null,
        addedDate: string,
        authorName: string,
        height: number,
        thumbUrl: string,
        title: string,
        type: BookmarkTypeEnum|null,
        url: string,
        width: number,
        duration?: number
}
