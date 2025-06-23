import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.entity';
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Create a new booking
  @Post()
  async create(@Body() body: { studentEmail: string; teacherUsername: string }) {
    return this.bookingsService.createBooking(body);
  }

  // Get bookings by student email
  @Get('student/:email')
  async getByStudent(@Param('email') email: string): Promise<Booking[]> {
    return this.bookingsService.findByStudent(email);
  }

  // Get bookings by teacher username
  @Get('teacher/:username')
  async getByTeacher(@Param('username') username: string): Promise<Booking[]> {
    return this.bookingsService.findByTeacher(username);
  }

  // Get only pending bookings for a specific teacher
  @Get('pending/:username')
  async getPendingByTeacher(@Param('username') username: string): Promise<Booking[]> {
    return this.bookingsService.findPendingByTeacher(username);
  }

  // Delete a booking by ID
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.bookingsService.deleteBooking(id);
  }

  // Update booking status (confirmed or declined)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: 'confirmed' | 'declined' },
  ): Promise<{ message: string; booking: Booking }> {
    return this.bookingsService.updateBookingStatus(id, body.status);
  }
}
