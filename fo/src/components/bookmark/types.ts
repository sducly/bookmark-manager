import { WithStyles } from "@material-ui/core";
import { match } from "react-router";
import { Bookmark } from "../../schema";
import { IFetchMoreProps } from "../hoc";

export interface IListViewProps extends IFetchMoreProps, WithStyles<any> {}

export interface IBookmarkFormProps {
    match: match
}

export interface IBookmarkChildrenProps extends IFetchMoreProps{
    data: {
        points: Bookmark[]
    }
}
