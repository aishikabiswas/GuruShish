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
        destination: './uploads', // make sure this folder exists
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
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
    }),
  )
  async create(
    @Body() createDto: CreateTeacherProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createDto.degree_certificate_path = file.path; // save file path
    }
    return this.teacherProfileService.create(createDto);
  }

  @Get()
  findAll() {
    return this.teacherProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTeacherProfileDto) {
    return this.teacherProfileService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherProfileService.remove(id);
  }
}

