import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d0rg2b15pdvs73dv7gc0-a',        // Render DB host (internal URL host part)
      port: 5432,                                 // default Postgres port
      username: 'sailu',                          // your postgres username
      password: '9xYqe4jZuekeurKBnNkYctrC5NXDa0GJ',  // your postgres password
      database: 'gurushish',                      // your database name
      entities: [User],
      synchronize: true,                          // auto create tables (only use in dev)
    }),
    UserModule,
  ],
})
export class AppModule {}
