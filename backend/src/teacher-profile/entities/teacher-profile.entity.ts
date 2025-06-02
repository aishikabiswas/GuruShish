import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('teacher_profiles')
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: true })
  experience: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  subjects: string;

  @Column({ type: 'int', nullable: true })
  max_students: number;

  @Column({ nullable: true })
  degree_certificate_path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
