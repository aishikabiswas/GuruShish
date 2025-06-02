import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity('teacher_slot')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @ManyToOne(() => Teacher, teacher => teacher.slots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_id' })  // <-- explicitly map to DB column name here
  teacher: Teacher;
}
