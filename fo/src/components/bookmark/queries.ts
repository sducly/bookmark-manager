import gql from "graphql-tag";

export const BookmarksQuery = gql`
query Bookmarks($page: Int, $limit: Int, $type: String, $title: String) {
  count: countBookmark(type: $type, title: $title)
  results: bookmarks(page: $page, limit: $limit, type: $type, title: $title) {
    id url title authorName addedDate thumbUrl
  }
}`;

export const BookmarkQuery = gql`
query Bookmark($id: Int) {
  result: bookmark(id: $id) {
    id type url title authorName addedDate width height thumbUrl
  }
}`

export const UpdateBookmark = gql`
mutation UpdateBookmark($id: Int, $type: String, $url: String, $title: String, $authorName: String, $addedDate: String, $width: Int, $height: Int, $thumbUrl: String) {
  update: updateBookmark(id: $id, type: $type, url: $url, title: $title, authorName: $authorName, addedDate: $addedDate, width: $width, height: $height, thumbUrl: $thumbUrl) {
    id type url title authorName addedDate width height thumbUrl
  }
}
`