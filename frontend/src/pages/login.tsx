'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Login
      const res = await fetch('https://gurushish-3.onrender.com/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Store common user info
      localStorage.setItem('userId', data.id);
      localStorage.setItem('email', data.email);

      // Step 2: If teacher, fetch username from teacher_profiles using email
      if (data.role === 'teacher') {
        try {
          const profileRes = await fetch(
            `https://gurushish-3.onrender.com/teacher-profiles/email/${encodeURIComponent(data.email)}`
          );

          if (!profileRes.ok) {
            throw new Error('Profile not found');
          }

          const profileData = await profileRes.json();

          if (profileData.username) {
            localStorage.setItem('username', profileData.username);
            console.log('Stored username:', profileData.username);
          } else {
            toast.error('Username not found in profile data.');
            console.error('Username missing in profile data.');
          }
        } catch (err) {
          toast.error('Failed to retrieve teacher username.');
          console.error('Error fetching teacher profile:', err);
        }
      }

      toast.success('Login successful! Redirecting...');

      setTimeout(() => {
        if (data.role === 'student') {
          router.push('/student');
        } else if (data.role === 'teacher') {
          router.push('/teacher');
        } else {
          router.push('/dashboard');
        }
      }, 1500);
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <div className="mb-4 text-red-600 text-center font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}
