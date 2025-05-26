// pages/booking.tsx
import { useState } from 'react';

const Booking = () => {
  const [bookedSessions, setBookedSessions] = useState([
    { tutor: 'John Doe', subject: 'Math', date: '2025-05-12', time: '10:00 AM' },
    { tutor: 'Jane Smith', subject: 'Science', date: '2025-05-15', time: '11:00 AM' },
  ]);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Your Booked Sessions</h1>
      {bookedSessions.length === 0 ? (
        <p className="text-lg">No sessions booked yet.</p>
      ) : (
        <div className="space-y-4">
          {bookedSessions.map((session, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-md">
              <p className="font-bold">{session.tutor} - {session.subject}</p>
              <p>Date: {session.date}</p>
              <p>Time: {session.time}</p>
              <button className="mt-2 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
