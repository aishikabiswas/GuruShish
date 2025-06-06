import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { User } from '../user/user.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async createBooking(data: { studentEmail: string; teacherUsername: string }): Promise<Booking> {
    const student = await this.userRepo.findOneBy({ email: data.studentEmail });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const teacher = await this.teacherRepo.findOneBy({ username: data.teacherUsername });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const booking = this.bookingRepo.create({
      student_email: student.email,
      teacher_username: teacher.username,
      status: 'pending',
      student,
      teacher,
    });

    return this.bookingRepo.save(booking);
  }

  async findByStudent(email: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { student_email: email },
      relations: ['teacher', 'student'], // fetch related details
    });
  }

  async findByTeacher(username: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { teacher_username: username },
      relations: ['teacher', 'student'], // fetch related details
    });
  }

  async deleteBooking(id: number): Promise<{ message: string }> {
    const booking = await this.bookingRepo.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    await this.bookingRepo.remove(booking);
    return { message: 'Booking deleted successfully' };
  }
}
