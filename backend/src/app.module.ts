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

import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve static files from uploads folder
      serveRoot: '/uploads', // URL prefix
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sailu',      // your local DB username
      password: 'sailu',      // your local DB password
      database: 'gurushish',  // local database name
      entities: [User, Teacher, TeacherProfile, Booking],  // added Booking entity here
      synchronize: false, // set true only in development
    }),
    UserModule,
    TeacherModule,
    TeacherProfileModule,
    BookingsModule,  // import booking module here
  ],
})
export class AppModule {}
