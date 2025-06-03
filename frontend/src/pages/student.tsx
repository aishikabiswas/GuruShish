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
interface TeacherProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  location: string;
  subjects: string;
  max_students: number | null;
  degree_certificate_path: string;
}


export default function StudentDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<TeacherProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch('https://gurushish-3.onrender.com/teacher');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTeachers();
  }, []);

  const handleViewProfile = async (username: string) => {
    setLoadingProfile(true);
    try {
      const res = await fetch(`https://gurushish-3.onrender.com/teacher-profiles/username/${username}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      setSelectedProfile(data);
    } catch (err) {
      console.error(err);
      setSelectedProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

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
              <p className="text-gray-600 mt-1">Subject: <span className="font-medium">{teacher.subject}</span></p>
              <p className="text-gray-600 mt-1">Qualification: <span className="font-medium">{teacher.qualification || 'N/A'}</span></p>
              <p className="text-gray-600 mt-1">Experience: <span className="font-medium">{teacher.experience || 'N/A'}</span></p>
              <p className="text-gray-600 mt-1">Fee: <span className="font-medium">₹{teacher.fee || 0}</span></p>
              <p className="text-gray-600 mt-1">Day: <span className="font-medium">{teacher.day || 'N/A'}</span></p>
              <p className="text-gray-600 mt-1">Time: <span className="font-medium">{teacher.start_time} - {teacher.end_time}</span></p>

              <div className="mt-4">
                <button
                  className="w-full py-2 px-4 bg-[#001f3f] text-white rounded-lg hover:bg-blue-900 transition"
                  onClick={() => handleViewProfile(teacher.username)}
                >
                  {loadingProfile ? 'Loading...' : 'View Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Profile Modal */}
     {selectedProfile && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{selectedProfile.username}'s Profile</h2>
      <div className="space-y-3 text-gray-800">
        <p><strong>Name:</strong> {selectedProfile.name || 'N/A'}</p>
        <p><strong>Email:</strong> {selectedProfile.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {selectedProfile.phone || 'N/A'}</p>
        <p><strong>Education:</strong> {selectedProfile.education || 'N/A'}</p>
        <p><strong>Experience:</strong> {selectedProfile.experience || 'N/A'}</p>
        <p><strong>Location:</strong> {selectedProfile.location || 'N/A'}</p>
        <p><strong>Subjects:</strong> {selectedProfile.subjects || 'N/A'}</p>
        <p><strong>Max Students:</strong> {selectedProfile.max_students ?? 'N/A'}</p>

        {selectedProfile.degree_certificate_path && (
          <div>
            <p className="font-semibold mb-2">Degree Certificate:</p>
           <img
  src={`https://gurushish-3.onrender.com/${selectedProfile.degree_certificate_path.replace(/\\/g, '/')}`}
  alt="Degree Certificate"
/>

          </div>
        )}
      </div>
    </div>
  </div>
)}

      {/* Footer */}
      <footer className="bg-[#001f3f] text-white py-4 text-center">
        <p>&copy; 2025 GuruShish. All rights reserved.</p>
      </footer>
    </div>
  );
}
