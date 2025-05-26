import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sailu',          // your postgres username
      password: 'sailu',          // your postgres password
      database: 'gurushish',      // your database name
      entities: [User],
      synchronize: true,          // auto create tables in dev
    }),
    UserModule,
  ],
})
export class AppModule {}
