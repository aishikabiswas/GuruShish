// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sailu',
      password: 'sailu',
      database: 'gurushish',
      entities: [User, Teacher],
      synchronize: false, // true for dev only
    }),
    UserModule,
    TeacherModule,
  ],
})
export class AppModule {}
