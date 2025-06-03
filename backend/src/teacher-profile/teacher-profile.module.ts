// teacher-profile.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeacherProfileService } from './teacher-profile.service';
import { TeacherProfileController } from './teacher-profile.controller';
import { TeacherProfile } from './entities/teacher-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherProfile])],
  controllers: [TeacherProfileController],
  providers: [TeacherProfileService],
})
export class TeacherProfileModule {}
