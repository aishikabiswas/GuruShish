import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.usersRepository.findOne({ where: { email } });
  if (user && user.password === password) {
    return user;
  }
  return null;
}

  async findByEmail(email: string): Promise<User | undefined> {
  const user = await this.usersRepository.findOne({ where: { email } });
  return user ?? undefined; // convert null to undefined
}
}

