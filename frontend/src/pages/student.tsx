import { useState } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const [teachers, setTeachers] = useState([
    {
      name: "Ravi Teja",
      subject: "Mathematics",
      qualification: "PhD in Mathematics",
      experience: "6 years",
      location: "Vijayawada, Andhra Pradesh",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      availableSlots: [
        "Monday - 10 AM to 12 PM",
        "Wednesday - 1 PM to 3 PM",
        "Friday - 4 PM to 6 PM",
      ],
    },
    { 
      name: "Sravani Reddy",
      subject: "Physics",
      qualification: "MSc in Physics",
      experience: "4 years",
      location: "Warangal, Telangana",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      availableSlots: [
        "Tuesday - 9 AM to 11 AM",
        "Thursday - 2 PM to 4 PM",
        "Saturday - 5 PM to 7 PM",
      ],
    },
    {
      name: "Anil Kumar",
      subject: "Chemistry",
      qualification: "PhD in Chemistry",
      experience: "7 years",
      location: "Guntur, Andhra Pradesh",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      availableSlots: [
        "Tuesday - 10 AM to 12 PM",
        "Thursday - 1 PM to 3 PM",
        "Saturday - 3 PM to 5 PM",
      ],
    },
    {
      name: "Bhavya Lakshmi",
      subject: "Biology",
      qualification: "MSc in Biology",
      experience: "5 years",
      location: "Nellore, Andhra Pradesh",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      availableSlots: [
        "Monday - 9 AM to 11 AM",
        "Wednesday - 12 PM to 2 PM",
        "Friday - 3 PM to 5 PM",
      ],
    },
    {
      name: "Kiran Raju",
      subject: "English",
      qualification: "MA in English",
      experience: "5 years",
      location: "Hyderabad, Telangana",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      availableSlots: [
        "Tuesday - 8 AM to 10 AM",
        "Thursday - 11 AM to 1 PM",
        "Saturday - 4 PM to 6 PM",
      ],
    },
    {
      name: "Divya Rao",
      subject: "Telugu",
      qualification: "MA in Telugu Literature",
      experience: "8 years",
      location: "Visakhapatnam, Andhra Pradesh",
      image: "https://randomuser.me/api/portraits/women/36.jpg",
      availableSlots: [
        "Monday - 10 AM to 12 PM",
        "Wednesday - 2 PM to 4 PM",
        "Friday - 4 PM to 6 PM",
      ],
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase()) ||
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
          {filteredTeachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 p-6 border border-gray-100"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-gray-600 mt-1">
                Subject: <span className="font-medium">{teacher.subject}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Qualification: <span className="font-medium">{teacher.qualification}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Experience: <span className="font-medium">{teacher.experience}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Location: <span className="font-medium">{teacher.location}</span>
              </p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Available Slots:</h4>
                <ul className="mt-2 text-gray-600 list-disc list-inside">
                  {teacher.availableSlots.map((slot, i) => (
                    <li key={i}>{slot}</li>
                  ))}
                </ul>
              </div>

              <Link
                href={{
                  pathname: '/confirm-booking',
                  query: { teacher: teacher.name }, // Pass teacher name as query param
                }}
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 w-full text-center"
              >
                Book a Session
              </Link>
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
