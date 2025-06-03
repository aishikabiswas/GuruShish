// teacher-profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TeacherProfile } from './entities/teacher-profile.entity';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherProfileDto } from './dto/update-teacher-profile.dto';

@Injectable()
export class TeacherProfileService {
  constructor(
    @InjectRepository(TeacherProfile)
    private readonly teacherProfileRepo: Repository<TeacherProfile>,
  ) {}

  async create(createDto: CreateTeacherProfileDto): Promise<TeacherProfile> {
    const profile = this.teacherProfileRepo.create(createDto);
    return await this.teacherProfileRepo.save(profile);
  }

  async findAll(): Promise<TeacherProfile[]> {
    return await this.teacherProfileRepo.find();
  }

  async findOne(id: number): Promise<TeacherProfile> {
    const profile = await this.teacherProfileRepo.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Teacher profile #${id} not found`);
    }
    return profile;
  }

  async findByUsername(username: string): Promise<TeacherProfile> {
  console.log('Searching for username:', username);
  const profile = await this.teacherProfileRepo.findOne({ where: { username } });
  console.log('Found profile:', profile);
  
  if (!profile) {
    throw new NotFoundException(`Profile with username ${username} not found`);
  }

  return profile;
}


  async update(id: number, updateDto: UpdateTeacherProfileDto): Promise<TeacherProfile> {
    const profile = await this.teacherProfileRepo.preload({ id, ...updateDto });
    if (!profile) {
      throw new NotFoundException(`Teacher profile #${id} not found`);
    }
    return await this.teacherProfileRepo.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    await this.teacherProfileRepo.remove(profile);
  }
}
