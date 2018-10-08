import { Bookmark } from "../";

/**
 * User entity
 */
export default class User {
  public id: number = 0;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public token: string;
  public bookmarks: Bookmark[];
}