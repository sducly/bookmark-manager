import gql from "graphql-tag";

export const BookmarksQuery = gql`
query Bookmarks($page: Int, $limit: Int) {
  count: countBookmark
  results: bookmarks(page: $page, limit: $limit) {
    id url title authorName addedDate
  }
}`;

export const GetBookmarkQuery = gql`
query GetBookmark($id: Int) {
  getBookmark(id: $id) {
    id url
  }
}`