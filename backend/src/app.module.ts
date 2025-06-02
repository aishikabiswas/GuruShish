import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

import { TeacherProfileModule } from './teacher-profile/teacher-profile.module';
import { TeacherProfile } from './teacher-profile/entities/teacher-profile.entity';

import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d0rg2b15pdvs73dv7gc0-a',
      port: 5432,
      username: 'sailu',
      password: '9xYqe4jZuekeurKBnNkYctrC5NXDa0GJ',
      database: 'gurushish',
      entities: [User, Teacher, TeacherProfile],
      synchronize: true,
    }),
    UserModule,
    TeacherModule,
    TeacherProfileModule, // ✅ Add it here to be effective
  ],
})
export class AppModule {}
