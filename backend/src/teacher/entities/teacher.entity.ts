import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Booking } from '../../bookings/bookings.entity';

@Entity()
@Unique(['username']) // ✅ Add this line to fix foreign key constraint
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

  @OneToMany(() => Booking, (booking) => booking.teacher)
  bookings: Booking[];
}
