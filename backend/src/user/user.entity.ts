import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // ✅ Explicitly use the 'users' table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
