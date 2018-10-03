import * as React from "react";
import { BookmarksQuery } from "../";
import { Bookmark } from "../../../schema";
import { IQueryResponse, PaginateList } from "../../hoc";

const Card = ({bookmark}: {bookmark: Bookmark}) => {
    return <React.Fragment/>
}

export default class PointsList extends React.Component<{}, {}> {
    public render() {
        return <PaginateList query={BookmarksQuery} variables={{
            limit: 1,
            offset: 0
        }}>
        {({data, fetchMore}: IQueryResponse) => {
            const {bookmarks} = data;
            return <div>
            {bookmarks.map((b: Bookmark) => {
                return <Card bookmark={b} key={'points_'+b.id}/>
            })}

            <a onClick={fetchMore}>
                Next
            </a>
        </div>
        }}
        </PaginateList>;
    };
}
