export class CreateTeacherDto {
  username: string;
  subject: string;
  qualification?: string;
  experience?: string;
  fee?: number;
  day?: string;
  start_time?: string;
  end_time?: string;
}