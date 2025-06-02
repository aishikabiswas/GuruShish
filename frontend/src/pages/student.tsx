'use client';

import { useEffect, useState } from 'react';

interface Teacher {
  id: number;
  username: string;
  subject: string;
  qualification?: string;
  experience?: string;
  fee?: number;
  day?: string;
  start_time?: string;
  end_time?: string;
}

export default function StudentDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch('http://localhost:3045/teacher');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.username.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#001f3f] text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">GuruShish</h1>
          <input
            type="text"
            placeholder="Search Teachers or Subjects..."
            className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#001f3f] text-black w-full sm:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Find Your Perfect Teacher
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 p-6 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900">{teacher.username}</h3>
              <p className="text-gray-600 mt-1">
                Subject: <span className="font-medium">{teacher.subject}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Qualification: <span className="font-medium">{teacher.qualification || 'N/A'}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Experience: <span className="font-medium">{teacher.experience || 'N/A'}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Fee: <span className="font-medium">₹{teacher.fee || 0}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Day: <span className="font-medium">{teacher.day || 'N/A'}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Time: <span className="font-medium">{teacher.start_time} - {teacher.end_time}</span>
              </p>

              <div className="mt-4">
                <button
                  className="w-full py-2 px-4 bg-[#001f3f] text-white rounded-lg hover:bg-blue-900 transition"
                  onClick={() => alert(`Viewing profile of ${teacher.username}`)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#001f3f] text-white py-4 text-center">
        <p>&copy; 2025 GuruShish. All rights reserved.</p>
      </footer>
    </div>
  );
}
