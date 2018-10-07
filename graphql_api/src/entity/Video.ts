import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Bookmark } from './Bookmark';

@Entity()
export class Video {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;
}