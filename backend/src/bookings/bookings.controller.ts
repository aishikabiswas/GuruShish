import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() body: { studentEmail: string; teacherUsername: string }) {
    return this.bookingsService.createBooking(body);
  }

  // Single GET route for fetching bookings by student email
  @Get('student/:email')
  async getByStudent(@Param('email') email: string): Promise<Booking[]> {
    return this.bookingsService.findByStudent(email);
  }

  @Get('teacher/:username')
  async getByTeacher(@Param('username') username: string) {
    return this.bookingsService.findByTeacher(username);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.bookingsService.deleteBooking(id);
  }
}
