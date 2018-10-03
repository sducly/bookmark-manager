import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bookmark } from './Bookmark';
import * as crypto from "crypto";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  salt: string = this.generateToken()

  @Column()
  password: string;

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];

  @Column()
  token: string = this.generateToken()

  private generateToken(): string {
    return crypto.randomBytes(32).toString("base64");
  }
}