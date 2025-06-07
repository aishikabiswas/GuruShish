import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  NotFoundException,   // <--- Import here
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { TeacherProfileService } from './teacher-profile.service';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherProfileDto } from './dto/update-teacher-profile.dto';

@Controller('teacher-profiles')
export class TeacherProfileController {
  constructor(private readonly teacherProfileService: TeacherProfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('degreeCertificate', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    }),
  )
  async create(
    @Body() createDto: CreateTeacherProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createDto.degree_certificate_path = file.path;
    }
    return await this.teacherProfileService.create(createDto);
  }

  @Get()
  async findAll() {
    return await this.teacherProfileService.findAll();
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const profile = await this.teacherProfileService.findByEmail(email);
    if (!profile) {
      throw new NotFoundException(`Profile with email ${email} not found`);
    }
    return profile;
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    console.log('Fetching teacher profile with username:', username);
    return await this.teacherProfileService.findByUsername(username);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.teacherProfileService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTeacherProfileDto,
  ) {
    return await this.teacherProfileService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.teacherProfileService.remove(id);
    return { message: 'Teacher profile deleted successfully' };
  }
}
