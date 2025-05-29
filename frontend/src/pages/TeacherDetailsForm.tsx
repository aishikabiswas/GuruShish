'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherDetailsForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    subject: '',
    qualification: '',
    experience: '',
    location: '',
    slots: [{ day: '', time: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (e.target.name === 'day' || e.target.name === 'time') {
      if (typeof index === 'number') {
        const updatedSlots = [...form.slots];
        updatedSlots[index][e.target.name] = e.target.value;
        setForm({ ...form, slots: updatedSlots });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };


  const removeSlot = (index: number) => {
    const updatedSlots = form.slots.filter((_, i) => i !== index);
    setForm({ ...form, slots: updatedSlots });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('teacherDetails', JSON.stringify(form));
    router.push('/TeacherDetailsPage');
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white mt-10 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Enter Teaching Details</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Subject */}
        <div>
          <label className="font-semibold mb-2 block">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., Mathematics"
            required
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block font-semibold mb-1">Highest Qualification</label>
          <input
            type="text"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., PhD in Mathematics"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-semibold mb-1">Teaching Experience</label>
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., 6 years"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location (City, State)</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., Vijayawada, Andhra Pradesh"
            required
          />
        </div>

        {/* Slots */}
        <div>
          <label className="font-semibold mb-2 block">Available Slot</label>
          {form.slots.map((slot, index) => (
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
          
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-full"
        >
          Create slot
        </button>
      </form>
    </div>
  );
}
