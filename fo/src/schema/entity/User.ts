import { Bookmark } from "../";

export default  class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public token: string;
  public bookmarks: Bookmark[];
}