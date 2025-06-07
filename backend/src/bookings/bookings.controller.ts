import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() body: { studentEmail: string; teacherUsername: string }) {
    return this.bookingsService.createBooking(body);
  }

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

  // New PATCH route to update booking status
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: 'confirmed' | 'declined' },
  ): Promise<Booking> {
    return this.bookingsService.updateBookingStatus(id, body.status);
  }
}
