import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Video } from './Video';

/**
 * Bookmark entity
 */
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

  @Column()
  thumbUrl: String

  @Column({ length: 300, nullable: true })
  tags: String

  @OneToOne(type => Video, { cascade: ["insert"] })
  @JoinColumn()
  video: Video|null

  @ManyToOne(() => User, user => user.bookmarks, { cascade: ["insert"] })
  user: User|null;
}