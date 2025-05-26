'use client';
import Link from 'next/link';
import { FaHome, FaUserPlus, FaSignInAlt } from 'react-icons/fa'; // Import icons from react-icons

export default function Header() {
  return (
    <header className="bg-[#001F3F] text-white sticky top-0 z-50 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center"> {/* Increased the padding for taller navbar */}
        
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-400 flex items-center space-x-2">
          <span>GuruShish</span>
        </Link>

        {/* Right: Desktop Nav Links */}
        <nav className="flex space-x-8 text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300">
            <FaHome size={20} /> {/* Home Icon */}
            <span>Home</span>
          </Link>
          <Link href="/register" className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300">
            <FaUserPlus size={20} /> {/* Register Icon */}
            <span>Register</span>
          </Link>
          <Link href="/login" className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-all duration-300">
            <FaSignInAlt size={20} /> {/* Login Icon */}
            <span>Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
