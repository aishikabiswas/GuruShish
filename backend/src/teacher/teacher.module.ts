import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Availability } from './entities/availability.entity';
import { Timeslot } from './entities/timeslot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Availability, Timeslot])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
