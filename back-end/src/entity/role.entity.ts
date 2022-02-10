import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

// Class 이름 = 테이블 이름
@Entity()
export class Role {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  roleName: string;

  // 다대일 양방향 매핑 (user <-> todo)
  @ManyToOne(() => User, (user) => user.role)
  user: User;
}
