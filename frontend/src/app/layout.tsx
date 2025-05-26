// src/app/layout.tsx
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";  // Import your global styles

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
