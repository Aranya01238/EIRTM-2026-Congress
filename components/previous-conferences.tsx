"use client";

import { useState, useRef, useEffect } from "react";
import ConferenceCard from "./ConferenceCard";

// --- UPDATED: Added a 'link' property to each object ---
const conferences = [
  {
    year: 2025,
    title: "EIRTM 2025",
    description:
      "Showcasing innovations in AI, IoT, and sustainable technology",
    attendees: "500+",
    sessions: "40+",
    link: "#", // <-- NEW
  },
  {
    year: 2024,
    title: "EIRTM 2024",
    description: "Focus on digital transformation and emerging technologies",
    attendees: "450+",
    sessions: "35+",
    link: "#", // <-- NEW
  },
  {
    year: 2023,
    title: "EIRTM 2023",
    description: "Exploring the intersection of research and innovation",
    attendees: "400+",
    sessions: "30+",
    link: "#", // <-- NEW
  },
];

export default function PreviousConferences() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const xSpot = e.clientX - rect.left;
      const ySpot = e.clientY - rect.top;
      setMousePos({ x: xSpot, y: ySpot });
    };

    const currentRef = sectionRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="conferences"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(103, 232, 249, 0.1), transparent 80%)`,
        }}
      ></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-white mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-text-shine">
            Previous Conferences
          </h2>
          <div className="h-1 w-24 bg-cyan-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {conferences.map((conf, index) => (
            <ConferenceCard key={conf.year} conference={conf} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
