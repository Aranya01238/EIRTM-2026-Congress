"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, Users, Presentation } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PreviousConferences() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const xSpot = e.clientX - rect.left;
      const ySpot = e.clientY - rect.top;
      setMousePos({ x: xSpot, y: ySpot });
    };

    const ref = sectionRef.current;
    if (ref) ref.addEventListener("mousemove", handleMouseMove);
    return () => ref?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const conferences = [
    {
      year: 2025,
      title: "EIRTM 2025",
      description:
        "Showcasing innovations in AI, IoT, and sustainable technology that redefine industries and shape the future.",
      attendees: "500+",
      sessions: "40+",
      link: "#",
      image: "/gallery/conference-hall.png", // sample image from your gallery
    },
  ];

  return (
    <section
      id="conferences"
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-10 bg-gradient-to-b from-[#E0F7FA] via-[#D4F1F9] to-[#ECFBFF] overflow-hidden"
    >
      {/* Dynamic Glow */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(103,232,249,0.15), transparent 80%)`,
        }}
      ></div>

      {/* Floating blobs */}
      <div className="absolute -top-32 -left-20 w-80 h-80 bg-cyan-200 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-200 opacity-40 blur-3xl rounded-full animate-pulse"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto relative z-10 text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 drop-shadow-[0_0_12px_rgba(103,232,249,0.4)] mb-4">
          Previous Conferences
        </h2>
        <div className="h-1 w-28 bg-cyan-400 mx-auto rounded-full shadow-[0_0_12px_#0ff] mb-10"></div>
        <p className="text-lg text-[#1c3c4c] max-w-2xl mx-auto opacity-80">
          Explore highlights from our previous events celebrating innovation,
          collaboration, and technology excellence.
        </p>
      </div>

      {/* Conference Card */}
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10 bg-white/70 backdrop-blur-xl border border-cyan-100 rounded-3xl shadow-[0_0_25px_rgba(103,232,249,0.25)] hover:shadow-[0_0_45px_rgba(103,232,249,0.5)] transition-all duration-500 p-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-left space-y-6">
          <div className="flex items-center gap-2 text-cyan-600">
            <Calendar size={20} />
            <span className="text-sm font-semibold tracking-widest uppercase">
              {conferences[0].year}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-[#25265C]">
            {conferences[0].title}
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {conferences[0].description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-full border border-cyan-200 text-cyan-700 font-medium shadow-[0_0_10px_rgba(103,232,249,0.2)]">
              <Users size={16} />
              Attendees: {conferences[0].attendees}
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 text-blue-700 font-medium shadow-[0_0_10px_rgba(103,232,249,0.2)]">
              <Presentation size={16} />
              Sessions: {conferences[0].sessions}
            </div>
          </div>

          <Link
            href={conferences[0].link}
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(103,232,249,0.8)] transition-transform hover:scale-105"
          >
            View Details
          </Link>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          <div className="relative w-full max-w-md h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(103,232,249,0.4)] hover:shadow-[0_0_60px_rgba(103,232,249,0.7)] transition-all duration-500">
            <Image
              src={conferences[0].image}
              alt={conferences[0].title}
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
