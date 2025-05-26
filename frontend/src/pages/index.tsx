import Header from '../app/components/Header'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">GuruShish</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
          A platform that bridges students with the best tutors.
        </p>
      </main>
    </div>
  );
}
