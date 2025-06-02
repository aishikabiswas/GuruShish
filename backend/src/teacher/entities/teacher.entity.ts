import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  subject: string;

  @Column({ length: 100, nullable: true })
  qualification?: string;

  @Column({ length: 100, nullable: true })
  experience?: string;

  @Column('numeric', { nullable: true })
  fee?: number;

  @Column({ length: 20, nullable: true })
  day?: string;

  @Column('time', { nullable: true })
  start_time?: string;

  @Column('time', { nullable: true })
  end_time?: string;
}
