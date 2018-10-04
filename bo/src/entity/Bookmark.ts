import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Video } from './Video';

@Entity()
export class Bookmark {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: String

  @Column()
  url: String

  @Column()
  title: String

  @Column()
  authorName: String

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  addedDate: String

  @Column()
  width: number
  
  @Column()
  height: number

  @OneToOne(type => Video)
  @JoinColumn()
  video: Video|null

  @ManyToOne(() => User, user => user.bookmarks, { cascade: ["insert"] })
  user: User|null;
}