'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Profile = {
  username: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  location: string;
  subjects: string;
  maxStudents: string;
};

type Booking = {
  id: number;
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
  status: string;
};

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'confirmed'>('profile');
  const [profile, setProfile] = useState<Profile>({
    username: '',
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    location: '',
    subjects: '',
    maxStudents: '',
  });
  const [degreeCertificate, setDegreeCertificate] = useState<File | null>(null);
  const [confirmedSessions, setConfirmedSessions] = useState<Booking[]>([]);

  useEffect(() => {
    setMounted(true);
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setProfile(prev => ({ ...prev, username: storedUsername }));
      fetchConfirmedSessions(storedUsername);
    } else {
      toast.error('No teacher username found. Please log in again.');
    }
  }, []);


  const fetchConfirmedSessions = async (username: string) => {
    try {
      const res = await fetch(`http://localhost:3040/bookings/teacher/${username}`);
      if (!res.ok) throw new Error('Failed to fetch confirmed sessions');
      const data = await res.json();
      const confirmed = data.filter((s: Booking) => s.status === 'confirmed');
      setConfirmedSessions(confirmed);
    } catch (err) {
      toast.error('Error fetching confirmed sessions');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDegreeCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => formData.append(key, value));
      if (degreeCertificate) {
        formData.append('degreeCertificate', degreeCertificate);
      }

      const response = await fetch('http://localhost:3040/teacher-profiles', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData?.message?.toLowerCase().includes('username')
          ? 'Username already exists!'
          : 'Failed to save profile';
        toast.error(message);
        return;
      }

      toast.success('Profile saved successfully!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setProfile({
      username: '',
      name: '',
      email: '',
      phone: '',
      education: '',
      experience: '',
      location: '',
      subjects: '',
      maxStudents: '',
    });
    setDegreeCertificate(null);
  };
  if (!mounted) 
  return null;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />

      <main className="flex-1 p-8">
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Teacher Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Fields */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                  required
                />
              </div>

              {['name', 'email', 'phone', 'location'].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={(profile as any)[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Education</label>
                <textarea
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Experience</label>
                <textarea
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  name="subjects"
                  value={profile.subjects}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Max Students</label>
                <select
                  name="maxStudents"
                  value={profile.maxStudents}
                  onChange={(e) => setProfile({ ...profile, maxStudents: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-3"
                  required
                >
                  <option value="">Select number</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Upload Degree Certificate</label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleCertificateChange}
                  required={!degreeCertificate}
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                <button type="button" onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded-md">Reset</button>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'confirmed' && (
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Confirmed Sessions</h2>
            {confirmedSessions.length === 0 ? (
              <p className="text-gray-600">No confirmed sessions yet.</p>
            ) : (
              confirmedSessions.map((session) => (
                <div key={session.id} className="border border-green-300 p-4 mb-4 rounded-lg shadow-sm bg-green-50">
                  <p><strong>Student Name:</strong> {session.student?.name}</p>
                  <p><strong>Student Email:</strong> {session.student?.email}</p>
                  <p><strong>Phone:</strong> {session.student?.phone || "N/A"}</p>
                  <p><strong>Subject:</strong> {session.teacher?.subject}</p>
                  <p><strong>Qualification:</strong> {session.teacher?.qualification}</p>
                  <p><strong>Experience:</strong> {session.teacher?.experience}</p>
                  <p><strong>Fee:</strong> ₹{session.teacher?.fee}</p>
                  <p><strong>Day:</strong> {session.teacher?.day}</p>
                  <p><strong>Time:</strong> {session.teacher?.start_time} - {session.teacher?.end_time}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <aside className="w-64 bg-white p-6 border-l flex flex-col gap-4 shadow-md">
        <h3 className="text-xl font-bold text-blue-800 text-center">Dashboard</h3>
        <Link href="/TeacherDetailsForm">
          <button className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md">Create Slots</button>
        </Link>
        <button onClick={() => setActiveTab('confirmed')} className={`w-full px-4 py-2 rounded-md ${activeTab === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-600 hover:text-white'}`}>
          Confirmed Sessions
        </button>
        <Link href="/PendingSessions">
          <button className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md">Pending Sessions</button>
        </Link>
        <button onClick={() => setActiveTab('profile')} className={`w-full px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-600 hover:text-white'}`}>
          Profile
        </button>
      </aside>
    </div>
  );
}
