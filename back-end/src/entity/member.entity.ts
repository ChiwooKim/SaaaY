import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

// Class 이름 = 테이블 이름
@Entity()
export class Member {
  @PrimaryGeneratedColumn() // PK, Auto Increment
  id: number;

  @Column()
  email: string; // Column 정의 (DB에 자동생성)

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  grade: string;

  @Column()
  profileImage: string;

  @Column()
  biography: string;

  @ManyToOne(() => Role, (role) => role.member)
  role: Role;
}
