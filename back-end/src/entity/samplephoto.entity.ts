import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TestPhotoMetadata } from './samplephotometadata.entity';

@Entity()
export class TestPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(() => TestPhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata: TestPhotoMetadata;
}
