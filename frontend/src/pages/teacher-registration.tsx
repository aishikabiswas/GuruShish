
import { useState } from "react";

export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    subjects: "",
    maxStudents: 1,
    certificate: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        certificate: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.certificate) {
      alert("Please upload your degree certificate.");
      return;
    }

    // Submit to backend (API integration needed)
    console.log("Teacher Data:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Registration Successful 🎉</h2>
          <p className="text-gray-700">
            Thank you for registering. Your profile will be reviewed and verified shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#001f3f] mb-6">Teacher Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="education"
            placeholder="Education Details (e.g. B.Ed, M.Sc Mathematics)"
            required
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="experience"
            placeholder="Work Experience (e.g. 2 years teaching at XYZ School)"
            required
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="subjects"
            placeholder="Subjects you teach (e.g. Math, Science)"
            required
            value={formData.subjects}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="maxStudents"
            required
            value={formData.maxStudents}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} student{i !== 0 ? "s" : ""}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            required
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-500">Upload degree certificate (PDF or image format)</p>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Register as Teacher
          </button>
        </form>
      </div>
    </div>
  );
}
