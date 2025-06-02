import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { Slot } from './entities/teacher-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Slot])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
