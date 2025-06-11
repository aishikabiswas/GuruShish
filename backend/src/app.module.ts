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
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d14lfpfdiees73f97hg0-a', 
      port: 5432,
      username: 'sailu',
      password: 'NP07UaV1V72BVg6IcqKznSzG78PoHK5v',
      database: 'gurushish_db',
      entities: [User, Teacher, TeacherProfile, Booking],
      synchronize: true, // Disable in production

    }),

    UserModule,
    TeacherModule,
    TeacherProfileModule,
    BookingsModule,
  ],
})
export class AppModule {}
