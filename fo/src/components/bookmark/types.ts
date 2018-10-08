import { WithStyles } from "@material-ui/core";
import { match } from "react-router";
import { IFetchMoreProps } from "../../libs/hoc";
import { Bookmark, BookmarkTypeEnum, User } from "../../schema";

export interface IListViewProps extends IFetchMoreProps, WithStyles<any> {
    user: any
}

export interface IBookmarkFormProps extends WithStyles<any> {
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
        tags: string,
        width: number,
        video?: {
            duration: number
        }
}
