import gql from "graphql-tag";

export const BookmarksQuery = gql`
query Bookmarks($page: Int, $limit: Int, $type: String, $title: String) {
  count: countBookmark(type: $type, title: $title)
  results: bookmarks(page: $page, limit: $limit, type: $type, title: $title) {
    id url title authorName addedDate
  }
}`;

export const GetBookmarkQuery = gql`
query GetBookmark($id: Int) {
  getBookmark(id: $id) {
    id url
  }
}`