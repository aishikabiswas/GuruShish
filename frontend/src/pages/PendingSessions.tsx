"use client";

import React, { useState, useEffect } from "react";

interface Booking {
  id: number;
  student_email: string;
  teacher_username: string;
  status: string;
  created_at: string;
  student: {
    name: string;
    email: string;
  };
  teacher: {
    username: string;
    subject: string;
    qualification?: string;
    experience?: string;
    fee?: number;
    day?: string;
    start_time?: string;
    end_time?: string;
  };
}

const PendingSessions: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<number | null>(null);

  const [teacherUsername, setTeacherUsername] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("username") || "";
      setTeacherUsername(username);
    }
  }, []);

  useEffect(() => {
    if (!teacherUsername) {
      setError("Username not found in localStorage.");
      setLoading(false);
      return;
    }

    async function fetchBookings() {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(
          `http://localhost:3043/bookings/teacher/${encodeURIComponent(teacherUsername)}`
        );

        if (!res.ok) {
          setError(`Failed to fetch: ${res.status} ${res.statusText}`);
          setLoading(false);
          return;
        }

        const data: Booking[] = await res.json();
        setBookings(data);
      } catch (e) {
        console.error(e);
        setError("Unexpected error occurred while fetching bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [teacherUsername]);

  const pendingBookings = bookings.filter((b) => b.status.toLowerCase() === "pending");

  const handleDecline = async (id: number) => {
    if (!window.confirm("Are you sure you want to decline this booking?")) return;

    setActionId(id);
    try {
      const res = await fetch(`http://localhost:3043/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errMsg = await res.text();
        alert(`Failed to decline booking: ${res.status} ${res.statusText} - ${errMsg}`);
        setActionId(null);
        return;
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Error declining booking:", error);
      alert("Error declining booking. Please try again.");
    } finally {
      setActionId(null);
    }
  };

  const handleAccept = async (id: number) => {
    setActionId(id);
    try {
      const res = await fetch(`http://localhost:3043/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmed" }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        alert(`Failed to confirm booking: ${res.status} ${res.statusText} - ${errMsg}`);
        setActionId(null);
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Error confirming booking. Please try again.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-yellow-600">Pending Sessions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 font-bold">{error}</p>}

      {!loading && !error && pendingBookings.length === 0 && (
        <p>No pending sessions found.</p>
      )}

      {!loading && !error && pendingBookings.length > 0 && (
        <div className="space-y-4">
          {pendingBookings.map((b) => (
            <div key={b.id} className="border p-4 rounded shadow bg-yellow-50">
              <p>
                <strong>Student Name:</strong> {b.student?.name || "N/A"}
              </p>
              <p>
                <strong>Student Email:</strong> {b.student?.email || "N/A"}
              </p>
              <p>
                <strong>Subject:</strong> {b.teacher?.subject || "N/A"}
              </p>
              <p>
                <strong>Qualification:</strong> {b.teacher?.qualification || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {b.teacher?.experience || "N/A"}
              </p>
              <p>
                <strong>Fee:</strong>{" "}
                {b.teacher?.fee !== undefined ? `₹${b.teacher.fee}` : "N/A"}
              </p>
              <p>
                <strong>Day:</strong> {b.teacher?.day || "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {b.teacher?.start_time || "N/A"} -{" "}
                {b.teacher?.end_time || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{b.status}</span>
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAccept(b.id)}
                  disabled={actionId === b.id}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {actionId === b.id ? "Accepting..." : "Accept"}
                </button>

                <button
                  onClick={() => handleDecline(b.id)}
                  disabled={actionId === b.id}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {actionId === b.id ? "Declining..." : "Decline"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )} 
    </div>
  );
};

export default PendingSessions;
