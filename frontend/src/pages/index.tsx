import { motion } from 'framer-motion';
import Header from '../app/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg px-8 py-12 max-w-xl w-full flex flex-col items-center border border-blue-200"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center"
          >
            Welcome to <span className="text-blue-600">GuruShish</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg sm:text-xl text-gray-700 mb-8 text-center"
          >
            Connect with qualified tutors for personalized sessions.<br />
            One teacher. Ten students. Focused guidance.
          </motion.p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors text-lg mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Get Started
          </motion.a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 text-sm text-gray-600 font-medium text-center"
        >
          Helping students thrive with the right guidance 🧠📘
        </motion.p>
      </main>
    </div>
  );
}
