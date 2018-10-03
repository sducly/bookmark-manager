import gql from "graphql-tag";

export const BookmarksQuery = gql`
query Bookmarks($offset: Int, $limit: Int) {
  bookmarks(offset: $offset, limit: $limit) {
    id url title authorName addedDate
  }
}`;

export const GetBookmarkQuery = gql`
query GetBookmark($id: Int) {
  getBookmark(id: $id) {
    id url
  }
}`