import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TestUser } from './sampleuser.entity';

// Class 이름 = 테이블 이름
@Entity()
export class TestTodo {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  todo: string; // Column 정의 (DB에 자동생성)

  // 다대일 양방향 매핑 (user <-> todo)
  @ManyToOne(() => TestUser, (user) => user.todos)
  user: TestUser;
}
