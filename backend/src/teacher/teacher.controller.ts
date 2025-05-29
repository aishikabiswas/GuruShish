import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateAvailabilityDto } from './dto/create-teacher.dto';
import { Availability } from './entities/availability.entity';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    return this.teacherService.create(createAvailabilityDto);
  }

  @Get()
  async findAll(): Promise<Availability[]> {
    return this.teacherService.findAll();
  }
}
