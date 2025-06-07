

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherDetailsPage() {
  const router = useRouter();

  const [data, setData] = useState<{
    subject: string;
    qualification: string;
    experience: string;
    location: string;
    slots: { day: string; time: string }[];
  }>({
    subject: '',
    qualification: '',
    experience: '',
    location: '',
    slots: [{ day: '', time: '' }],
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('teacherDetails');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      router.push('/teacher/subject-form'); // redirect if no data
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (e.target.name === 'day' || e.target.name === 'time') {
      if (typeof index === 'number') {
        const newSlots = [...data.slots];
        newSlots[index][e.target.name] = e.target.value;
        setData({ ...data, slots: newSlots });
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const addSlot = () => {
    setData({ ...data, slots: [...data.slots, { day: '', time: '' }] });
  };

  const removeSlot = (index: number) => {
    setData({ ...data, slots: data.slots.filter((_, i) => i !== index) });
  };

  const saveChanges = () => {
    localStorage.setItem('teacherDetails', JSON.stringify(data));
    setEditMode(false);
  };

  const deleteDetails = () => {
    localStorage.removeItem('teacherDetails');
    router.push('/teacher/subject-form');
  };

  if (!data.subject) return null; // or loading state

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white mt-10 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Teaching Details</h1>

      {editMode ? (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); saveChanges(); }}>

          {/* Subject */}
          <div>
            <label className="font-semibold mb-2 block">Subject You Can Teach</label>
            <input
              type="text"
              name="subject"
              value={data.subject}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block font-semibold mb-1">Highest Qualification</label>
            <input
              type="text"
              name="qualification"
              value={data.qualification}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold mb-1">Teaching Experience</label>
            <input
              type="text"
              name="experience"
              value={data.experience}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location (City, State)</label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Slots */}
          <div>
            <label className="font-semibold mb-2 block">Available Slots</label>
            {data.slots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="day"
                  placeholder="Day (e.g., Monday)"
                  value={slot.day}
                  onChange={(e) => handleChange(e, index)}
                  className="flex-1 border rounded p-2"
                  required
                />
                <input
                  type="text"
                  name="time"
                  placeholder="Time (e.g., 10 AM - 12 PM)"
                  value={slot.time}
                  onChange={(e) => handleChange(e, index)}
                  className="flex-1 border rounded p-2"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSlot}
              className="text-blue-600 hover:underline"
            >
              + Add Another Slot
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition w-full"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="mt-2 w-full py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Subject:</strong> {data.subject}</p>
          <p><strong>Qualification:</strong> {data.qualification}</p>
          <p><strong>Experience:</strong> {data.experience}</p>
          <p><strong>Location:</strong> {data.location}</p>
          <div>
            <strong>Available Slots:</strong>
            <ul className="list-disc pl-5">
              {data.slots.map((slot, i) => (
                <li key={i}>
                  {slot.day} - {slot.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Edit
            </button>
            <button
              onClick={deleteDetails}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}