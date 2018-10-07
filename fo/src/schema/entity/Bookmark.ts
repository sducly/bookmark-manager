import { User, Video } from "..";
import { BookmarkTypeEnum } from "..";

export default class Bookmark {
  public id: number
  public type: BookmarkTypeEnum
  public url: string
  public title: string
  public authorName: string
  public addedDate: string
  public width: number
  public height: number
  public video: Video
  public user: User|null
  public thumbUrl: string
  public tags: string
}