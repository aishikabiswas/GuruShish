import { IsString, IsNumber, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSlotDto {
  @IsString()
  day: string;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;
}

export class CreateTeacherDto {
  @IsString()
  username: string;

  @IsString()
  subject: string;

  @IsString()
  qualification: string;

  @IsString()
  experience: string;

  @IsNumber()
  fee: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSlotDto)
  @ArrayMinSize(1)
  slots: CreateSlotDto[];
}
