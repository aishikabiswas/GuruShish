import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { CreateAvailabilityDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const availability = this.availabilityRepository.create(createAvailabilityDto);
    return await this.availabilityRepository.save(availability);
  }

  async findAll(): Promise<Availability[]> {
    return await this.availabilityRepository.find();
  }

  // Add other methods like findOne, update, delete as needed
}
