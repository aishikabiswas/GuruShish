import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Timeslot } from './timeslot.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  qualification: string;

  @Column()
  experience: string;

  @Column()
  location: string;

  @OneToMany(() => Timeslot, (timeslot) => timeslot.availability, {
    cascade: true,
    eager: true,
  })
  timeslots: Timeslot[];
}
