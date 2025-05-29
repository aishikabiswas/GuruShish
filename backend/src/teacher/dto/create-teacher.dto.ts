import { IsString, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class TimeslotDto {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}

export class CreateAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @ValidateNested({ each: true })
  @Type(() => TimeslotDto)
  @ArrayMinSize(1)
  timeslots: TimeslotDto[];
}
