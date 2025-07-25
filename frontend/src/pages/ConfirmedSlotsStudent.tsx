"use client";

import React, { useEffect, useState } from "react";

const StudentConfirmedSessions = () => {
  const [confirmedSessions, setConfirmedSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentEmail, setStudentEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email") || "";
      setStudentEmail(email);
    }
  }, []);

  useEffect(() => {
    if (!studentEmail) return;

    const fetchConfirmedSessions = async () => {
      try {
        const response = await fetch(
          `https://gurushish-10.onrender.com/bookings/student/${studentEmail}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch confirmed sessions.");
        }

        const data = await response.json();
        const confirmed = data.filter((session: any) => session.status === "confirmed");
        setConfirmedSessions(confirmed);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedSessions();
  }, [studentEmail]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
        Your Confirmed Sessions
      </h2>
      {confirmedSessions.length === 0 ? (
        <p className="text-center text-gray-600">No confirmed sessions found.</p>
      ) : (
        <div className="grid gap-4">
          {confirmedSessions.map((session, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-md border border-green-400"
            >
              <p><strong>Teacher:</strong> {session.teacherUsername}</p>
              <p><strong>Subject:</strong> {session.subject}</p>
              <p><strong>Qualification:</strong> {session.qualification}</p>
              <p><strong>Experience:</strong> {session.experience}</p>
              <p><strong>Fee:</strong> ₹{session.fee}</p>
              <p><strong>Day:</strong> {session.day}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p className="text-green-600 font-semibold mt-2">Status: Confirmed</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentConfirmedSessions;
