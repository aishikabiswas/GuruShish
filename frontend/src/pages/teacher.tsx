'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'confirmed' | 'pending'>('profile');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    location: '',
    subjects: [''],
    maxStudents: '', // added maxStudents here
  });

  // Store certificate file separately
  const [degreeCertificate, setDegreeCertificate] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...profile.subjects];
    newSubjects[index] = value;
    setProfile({ ...profile, subjects: newSubjects });
  };

  const addSubject = () => {
    setProfile({ ...profile, subjects: [...profile.subjects, ''] });
  };

  const removeSubject = (index: number) => {
    const newSubjects = profile.subjects.filter((_, i) => i !== index);
    setProfile({ ...profile, subjects: newSubjects });
  };

  // Handle certificate file upload
  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDegreeCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Profile updated successfully!');
    console.log('Profile data:', profile);
    console.log('Uploaded degree certificate:', degreeCertificate);

    // TODO: Send profile and degreeCertificate to backend here
  };

  const handleReset = () => {
    setProfile({
      name: '',
      email: '',
      phone: '',
      education: '',
      experience: '',
      location: '',
      subjects: [''],
      maxStudents: '',
    });
    setDegreeCertificate(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Teacher Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {['name', 'email', 'phone', 'location'].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={(profile as any)[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Experience</label>
                <textarea
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Subjects You Teach</label>
                {profile.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => handleSubjectChange(index, e.target.value)}
                      placeholder={`Subject ${index + 1}`}
                      className="w-full border border-gray-300 rounded-md p-2 mr-2"
                      required
                    />
                    {profile.subjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="text-red-600 font-bold"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubject}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  + Add another subject
                </button>
              </div>

              {/* Dropdown for max students */}
              <div className="mb-6">
                <label
                  htmlFor="maxStudents"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Max Number of Students You Can Teach
                </label>
                <select
                  id="maxStudents"
                  name="maxStudents"
                  value={profile.maxStudents}
                  onChange={(e) =>
                    setProfile({ ...profile, maxStudents: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select number of students
                  </option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'student' : 'students'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Degree Certificate (PDF or Image)
                </label>
                <div className="flex items-center space-x-4 border-2 border-black rounded-md p-2">
                  <label
                    htmlFor="degreeCertificate"
                    className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Choose File
                  </label>
                  <input
                    id="degreeCertificate"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleCertificateChange}
                    className="hidden"
                    required={!degreeCertificate}
                  />
                  {degreeCertificate ? (
                    <span
                      className="text-gray-800 truncate max-w-xs"
                      title={degreeCertificate.name}
                    >
                      {degreeCertificate.name}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">No file selected</span>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'confirmed' && (
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Confirmed Sessions
            </h2>
            <p className="text-gray-600">No confirmed sessions yet.</p>
            {/* TODO: Load confirmed sessions */}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600">
              Pending Sessions
            </h2>
            <p className="text-gray-600">No pending sessions yet.</p>
            {/* TODO: Load pending sessions */}
          </div>
        )}
      </main>

      <aside className="w-64 bg-white p-6 border-l border-gray-200 flex flex-col space-y-4 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center text-blue-800">
          Dashboard
        </h3>
        <Link href="/TeacherDetailsForm">
          <button className="py-2 rounded-md text-left font-semibold px-4 w-full bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white transition">
            Create Slots
          </button>
        </Link>

        <button
          onClick={() => setActiveTab('confirmed')}
          className={`py-2 rounded-md text-left font-semibold px-4 ${
            activeTab === 'confirmed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800'
          } hover:bg-blue-600 hover:text-white transition`}
        >
          Confirmed Sessions
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`py-2 rounded-md text-left font-semibold px-4 ${
            activeTab === 'pending'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800'
          } hover:bg-blue-600 hover:text-white transition`}
        >
          Pending Sessions
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 rounded-md text-left font-semibold px-4 mt-auto ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800'
          } hover:bg-blue-600 hover:text-white transition`}
        >
          Profile
        </button>
      </aside>
    </div>
  );
}
