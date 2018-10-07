import gql from "graphql-tag";

export const BookmarksQuery = gql`
query Bookmarks($page: Int, $limit: Int, $type: String, $title: String, $userId: Int) {
  count: countBookmark(type: $type, title: $title, userId: $userId)
  results: bookmarks(page: $page, limit: $limit, type: $type, title: $title, userId: $userId) {
    id url title authorName addedDate thumbUrl 
  }
}`;

export const BookmarkQuery = gql`
query Bookmark($id: Int) {
  result: bookmark(id: $id) {
    id type url title authorName addedDate width height thumbUrl tags video { duration }
  }
}`

export const UpdateBookmark = gql`
mutation UpdateBookmark($id: Int, $type: String, $url: String, $title: String, $authorName: String, $addedDate: String, $width: Int, $height: Int, $thumbUrl: String, $userId: Int, $duration: Int, $tags: String) {
  update: updateBookmark(id: $id, type: $type, url: $url, title: $title, authorName: $authorName, addedDate: $addedDate, width: $width, height: $height, thumbUrl: $thumbUrl, userId: $userId, duration: $duration, tags: $tags) {
    id type url title authorName addedDate width height thumbUrl
  }
}`

export const DeleteBookmark = gql`
mutation DeleteBookmark($id: Int) {
  delete: deleteBookmark(id: $id) 
}`
