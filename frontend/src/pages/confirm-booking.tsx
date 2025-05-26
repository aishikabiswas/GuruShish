// pages/confirm-booking.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ConfirmBooking() {
  const router = useRouter();
  const { teacher } = router.query;
  const [status, setStatus] = useState("pending");

  const handleConfirm = () => {
    setStatus("waiting");
    // Simulate teacher confirmation after 3 seconds
    setTimeout(() => {
      setStatus("confirmed");
    }, 3000);
  };

  useEffect(() => {
    if (status === "confirmed") {
      // Simulate storing session to localStorage
      const sessions = JSON.parse(localStorage.getItem("bookedSessions") || "[]");
      sessions.push(teacher);
      localStorage.setItem("bookedSessions", JSON.stringify(sessions));
      // Redirect to My Sessions page
      router.push("/my-sessions");
    }
  }, [status]);

  if (!teacher) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
        <p className="mb-6">Do you want to book a session with <strong>{teacher}</strong>?</p>

        {status === "pending" && (
          <div className="space-x-4">
            <button onClick={handleConfirm} className="bg-[#001f3f] text-white px-4 py-2 rounded hover:bg-blue-950">Yes</button>
            <button onClick={() => router.back()} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">No</button>
          </div>
        )}

        {status === "waiting" && (
          <p className="text-blue-600 font-medium">Waiting for teacher confirmation...</p>
        )}
      </div>
    </div>
  );
}
