'use client'; 
import { useEffect, useState } from 'react';
interface Booking {
  id: number;
  status: string;
  student: {
    name: string;
    email: string;
    phone?: string;
  };
  teacher: {
    subject?: string;
    qualification?: string;
    experience?: string;
    fee?: number;
    day?: string;
    start_time?: string;
    end_time?: string;
  };
}

export default function ConfirmedSessions() {
  const [confirmedSessions, setConfirmedSessions] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username') || '';
      setUsername(storedUsername);
    }
  }, []);
  useEffect(() => {
    if (!username) 
        return;
    const fetchConfirmed = async () => {
      try {
        const res = await fetch(`http://localhost:3043/bookings/teacher/${username}`);
        if (!res.ok) throw new Error('Failed to fetch confirmed sessions');
        const data: Booking[] = await res.json();
        const confirmed = data.filter((session) => session.status === 'confirmed');
        setConfirmedSessions(confirmed);
      } catch (err: any) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchConfirmed();
  }, [username]);
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Confirmed Sessions</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && confirmedSessions.length === 0 && (
        <p className="text-gray-600">No confirmed sessions available.</p>
      )}
      {!loading && confirmedSessions.length > 0 && (
        <div className="space-y-4">
          {confirmedSessions.map((session) => (
            <div
              key={session.id}
              className="bg-green-50 border border-green-300 p-4 rounded-lg shadow"
            >
              <p><strong>Student Name:</strong> {session.student?.name}</p>
              <p><strong>Student Email:</strong> {session.student?.email}</p>
              <p><strong>Phone:</strong> {session.student?.phone || 'N/A'}</p>
              <p><strong>Subject:</strong> {session.teacher?.subject || 'N/A'}</p>
              <p><strong>Qualification:</strong> {session.teacher?.qualification || 'N/A'}</p>
              <p><strong>Experience:</strong> {session.teacher?.experience || 'N/A'}</p>
              <p><strong>Fee:</strong> ₹{session.teacher?.fee ?? 'N/A'}</p>
              <p><strong>Day:</strong> {session.teacher?.day || 'N/A'}</p>
              <p><strong>Time:</strong> {session.teacher?.start_time} - {session.teacher?.end_time}</p>
              <p><strong>Status:</strong> <span className="text-green-600 font-semibold capitalize">{session.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
