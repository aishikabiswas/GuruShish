// create-teacher-profile.dto.ts
import { IsString, IsInt, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeacherProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  subjects?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_students?: number;

  @IsOptional()
  @IsString()
  degree_certificate_path?: string;
}

