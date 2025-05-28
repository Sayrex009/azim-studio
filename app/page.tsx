'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div className="global-bg min-h-screen">
      <HomePage/>
    </div>
  );
}
