import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TestTodo } from './sampletodo.entity';

// Class 이름 = 테이블 이름
@Entity()
export class TestUser {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  name: string; // Column 정의 (DB에 자동생성)

  // 다대일 양방향 매핑 (user <-> todo)
  @OneToMany(() => TestTodo, (todo) => todo.user)
  todos: TestTodo[];
}
