import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

// Class 이름 = 테이블 이름
@Entity()
export class Chat {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  otheruserid: string;

  @Column()
  text: string;

  @Column()
  from: string;

  // 일대일 단방향 매핑 (user <-> chat), chat 쪽에만 데이터
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
