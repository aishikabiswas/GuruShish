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
  host: 'dpg-d1vnicfgi27c738egdpg-a.oregon-postgres.render.com', // ✅ Use full external host
  port: 5432,
  username: 'sailu',
  password: 'SLzOHxhGnokeKBC5G6mLevw0c9AgSTRS',
  database: 'db_1jza',
  entities: [User, Teacher, TeacherProfile, Booking],
  synchronize: true, // okay for now since DB is empty
  ssl: {
    rejectUnauthorized: false, // ✅ important for self-signed Render certs
  },
}),

    UserModule,
    TeacherModule,
    TeacherProfileModule,
    BookingsModule,
  ],
})
export class AppModule {}
