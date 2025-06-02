import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Slot } from './entities/teacher-slot.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { slots, fee, ...teacherData } = createTeacherDto;
    const teacher = this.teacherRepository.create({
      ...teacherData,
      fee: Number(fee),
      slots: slots.map(slot => this.slotRepository.create(slot)),
    });
    return this.teacherRepository.save(teacher);
  }
}
