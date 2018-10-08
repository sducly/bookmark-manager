import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

/**
 * Video entity
 */
@Entity()
export class Video {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;
}