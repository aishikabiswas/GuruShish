// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;  // Not stored in DB, just used for validation
  role: string;
}
