// pages/my-sessions.tsx
import { useEffect, useState } from "react";

export default function MySessions() {
  const [sessions, setSessions] = useState<string[]>([]);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookedSessions");
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  }, []);

  const handleCancel = (indexToRemove: number) => {
    const updatedSessions = sessions.filter((_, index) => index !== indexToRemove);
    setSessions(updatedSessions);
    localStorage.setItem("bookedSessions", JSON.stringify(updatedSessions));

    // Also reset view if currently viewing the deleted session
    if (viewingIndex === indexToRemove) {
      setViewingIndex(null);
    }
  };

  const handleView = (index: number) => {
    setViewingIndex(viewingIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#001f3f] mb-6">My Booked Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-600">You haven’t booked any sessions yet.</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((session, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">Session with <strong>{session}</strong></span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleCancel(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                {viewingIndex === index && (
                  <p className="text-sm text-gray-600 mt-2">⏳ Waiting for host to join...</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
