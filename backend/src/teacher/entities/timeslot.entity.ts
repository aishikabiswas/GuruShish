import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Availability } from './availability.entity';

@Entity()
export class Timeslot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column()
  time: string;

  @ManyToOne(() => Availability, (availability) => availability.timeslots, {
    onDelete: 'CASCADE',
  })
  availability: Availability;
}
