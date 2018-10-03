import { User, Video } from "..";

export default class Bookmark {
  public id: number
  public url: string
  public title: string
  public authorName: string
  public addedDate: string
  public width: number
  public height: number
  public video: Video
  public user: User|null
}