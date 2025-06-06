import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_email: string;  // just FK as string column

  @Column()
  teacher_username: string; // just FK as string column

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed';

  @CreateDateColumn()
  created_at: Date;

  // Relations to enable eager fetching if you want
  @ManyToOne(() => User, (user) => user.bookings, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_email', referencedColumnName: 'email' })
  student: User;

  @ManyToOne(() => Teacher, (teacher) => teacher.bookings, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_username', referencedColumnName: 'username' })
  teacher: Teacher;
}
