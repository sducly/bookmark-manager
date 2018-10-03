import { match } from "react-router";
import { Bookmark } from "../../schema";
import { IFetchMoreProps } from "../hoc";

export interface IListViewProps extends IFetchMoreProps {
    bookmarks: Bookmark[]
}

export interface IBookmarkFormProps {
    match: match
}

export interface IBookmarkChildrenProps extends IFetchMoreProps{
    data: {
        points: Bookmark[]
    }
}
