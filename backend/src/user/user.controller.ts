import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = await this.userService.create(createUserDto);
    return { message: 'User registered successfully', userId: user.id };
  }

 // Login user
@Post('login')
async login(@Body() loginUserDto: LoginUserDto) {
  const user = await this.userService.validateUser(
    loginUserDto.email,
    loginUserDto.password,
  );

  if (!user) {
    throw new BadRequestException('Invalid email or password');
  }

  return {
    message: 'Login successful',
    role: user.role,           // 👈 Send only required info
    name: user.name,
    email: user.email,
    userId: user.id,
  };
}
}
