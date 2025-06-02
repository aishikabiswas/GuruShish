import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Slot } from './teacher-slot.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  subject: string;

  @Column()
  qualification: string;

  @Column()
  experience: string;

  @Column('numeric')
  fee: number;

  @OneToMany(() => Slot, slot => slot.teacher)
  slots: Slot[];
}
