import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      const teacher = this.teacherRepository.create(createTeacherDto);
      return await this.teacherRepository.save(teacher);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: Partial<CreateTeacherDto>): Promise<Teacher> {
    await this.teacherRepository.update(id, updateTeacherDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.teacherRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
  }
}
