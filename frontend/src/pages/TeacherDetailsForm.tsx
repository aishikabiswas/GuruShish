'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Slot = {
  day: string;
  start_time: string;
  end_time: string;
};

type FormState = {
  username: string;
  subject: string;
  qualification: string;
  experience: string;
  fee: string;  // fee input stays string to allow user input, converted on submit
  slots: Slot[];
};

export default function TeacherDetailsForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    username: '',
    subject: '',
    qualification: '',
    experience: '',
    fee: '',
    slots: [{ day: '', start_time: '', end_time: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (['day', 'start_time', 'end_time'].includes(name) && typeof index === 'number') {
      const updatedSlots = [...form.slots];
      updatedSlots[index] = { ...updatedSlots[index], [name]: value };
      setForm({ ...form, slots: updatedSlots });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSlot = () => {
    setForm({ ...form, slots: [...form.slots, { day: '', start_time: '', end_time: '' }] });
  };

  const removeSlot = (index: number) => {
    const updatedSlots = form.slots.filter((_, i) => i !== index);
    setForm({ ...form, slots: updatedSlots });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate time range
    for (const slot of form.slots) {
      if (slot.start_time >= slot.end_time) {
        toast.error(`Invalid time range: ${slot.day}`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        fee: Number(form.fee), // convert fee to number
      };

      const res = await fetch('http://localhost:3003/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        toast.success('Details submitted successfully!');
        router.push('/TeacherDetailsPage');
      } else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message || 'Failed to submit details'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white mt-10 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Enter Teaching Details</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="User Name" name="username" value={form.username} onChange={handleChange} />
        <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} />
        <InputField label="Highest Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
        <InputField label="Teaching Experience" name="experience" value={form.experience} onChange={handleChange} />
        <InputField label="Fee per Session (INR)" name="fee" value={form.fee} onChange={handleChange} />

        <div>
          <label className="font-semibold mb-2 block">Available Slots</label>
          {form.slots.map((slot, index) => (
            <div key={index} className="flex flex-wrap gap-2 mb-3 items-center">
              <select
                name="day"
                value={slot.day}
                onChange={(e) => handleChange(e, index)}
                className="flex-1 border rounded p-2 min-w-[120px]"
                required
              >
                <option value="">Select Day</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <input
                type="time"
                name="start_time"
                value={slot.start_time}
                onChange={(e) => handleChange(e, index)}
                className="flex-1 border rounded p-2 min-w-[100px]"
                required
              />
              <input
                type="time"
                name="end_time"
                value={slot.end_time}
                onChange={(e) => handleChange(e, index)}
                className="flex-1 border rounded p-2 min-w-[100px]"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="text-red-600 font-bold hover:scale-105 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSlot}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
          >
            + Add Slot
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-2 rounded transition ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Details'}
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

function InputField({ label, name, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded p-2"
        required
      />
    </div>
  );
}
