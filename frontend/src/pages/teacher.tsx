import { useState, useEffect } from "react";

export default function TeacherDashboard() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchedRequests = [
      {   
        studentName: "Akshaya",
        subject: "Mathematics",
        date: "2025-05-12",
        time: "10 AM to 12 PM",
        teacherName: "Ravi Teja",
      },
      {
        studentName: "Sailaja",
        subject: "Physics",
        date: "2025-05-13",
        time: "9 AM to 11 AM",
        teacherName: "Sravani Reddy",
      },
      {
        studentName: "Ramesh",
        subject: "English",
        date: "2025-05-14",
        time: "11 AM to 1 PM",
        teacherName: "Kiran Raju",
      },
      {
        studentName: "Preethi",
        subject: "Chemistry",
        date: "2025-05-15",
        time: "2 PM to 4 PM",
        teacherName: "Anil Kumar",
      },
    ];
    setRequests(fetchedRequests); // Set the fetched requests data to state
  }, []);

  const handleConfirmRequest = (studentName: string, teacherName: string) => {
    alert(`Confirming session with ${studentName} for ${teacherName}`);
    // Here, you can add functionality to save the confirmed session to the backend or database
  };

  const handleDeclineRequest = (studentName: string, teacherName: string) => {
    alert(`Declining session with ${studentName} for ${teacherName}`);
    // You can add the functionality to remove or mark the request as declined in the backend
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#001f3f] text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">GuruShish</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Requests for Session Confirmation</h2>

        {requests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {requests.map((request, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900">{request.studentName}</h3>
                <p className="text-gray-600 mt-1">Subject: <span className="font-medium">{request.subject}</span></p>
                <p className="text-gray-600 mt-1">Date: <span className="font-medium">{request.date}</span></p>
                <p className="text-gray-600 mt-1">Time: <span className="font-medium">{request.time}</span></p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleConfirmRequest(request.studentName, request.teacherName)}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    Confirm Session
                  </button>
                  <button
                    onClick={() => handleDeclineRequest(request.studentName, request.teacherName)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Decline Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No session requests at the moment.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#001f3f] text-white py-4 text-center">
        <p>&copy; 2025 TutorFinder. All rights reserved.</p>
      </footer>
    </div>
  );
}
