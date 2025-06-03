import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

import { TeacherProfileModule } from './teacher-profile/teacher-profile.module';
import { TeacherProfile } from './teacher-profile/entities/teacher-profile.entity';

import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads folder
      serveRoot: '/uploads', // URL prefix for serving static files
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // localhost for local dev
      port: 5432,         // default PostgreSQL port
      username: 'sailu',  // change if your local DB uses a different user
      password: 'sailu',  // replace with your local DB password
      database: 'gurushish',     // make sure this DB exists locally
      entities: [User, Teacher, TeacherProfile],
      synchronize: true,         // auto-create tables (disable in production)
    }),
    UserModule,
    TeacherModule,
    TeacherProfileModule,
  ],
})
export class AppModule {}
