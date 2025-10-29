"use client";

import { useState, useRef } from "react";
import Link from "next/link"; // <-- NEW: Import Link

// --- UPDATED: Added 'link' to the type definition ---
type Conference = {
  year: number;
  title: string;
  description: string;
  attendees: string;
  sessions: string;
  link: string; // <-- NEW
};

interface ConferenceCardProps {
  conference: Conference;
  index: number;
}

export default function ConferenceCard({
  conference,
  index,
}: ConferenceCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / (rect.width / 2)) * -8;
    const rotateX = (y / (rect.height / 2)) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // --- UPDATED: Added 'group' for the link hover effect ---
      className="relative group p-8 rounded-2xl bg-blue-950/30 backdrop-blur-lg border border-cyan-300/20 shadow-xl transition-transform duration-300 ease-out animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* --- Card Content (unchanged) --- */}
      <div className="mb-4">
        <span className="inline-block px-4 py-2 bg-cyan-300/10 text-cyan-300 font-poppins font-bold rounded-full text-sm">
          {conference.year}
        </span>
      </div>

      <h3 className="text-2xl font-poppins font-bold text-white mb-3">
        {conference.title}
      </h3>

      <p className="text-white/70 mb-6 leading-relaxed">
        {conference.description}
      </p>

      <div className="flex gap-6 pt-6 border-t border-cyan-300/20">
        <div>
          <p className="text-cyan-300 font-poppins font-bold text-lg">
            {conference.attendees}
          </p>
          <p className="text-white/60 text-sm">Attendees</p>
        </div>
        <div>
          <p className="text-cyan-300 font-poppins font-bold text-lg">
            {conference.sessions}
          </p>
          <p className="text-white/60 text-sm">Sessions</p>
        </div>
      </div>

      {/* --- NEW: Stretched Link Overlay --- */}
      {/* This link covers the entire card, making it all clickable. */}
      {/* The 'z-10' ensures it's "above" the content for clicking. */}
      <Link
        href={conference.link}
        className="absolute inset-0 z-10"
        target="_blank" // Optional: Opens in a new tab
        rel="noopener noreferrer" // Optional: Good practice for new tabs
      >
        {/* Screen-reader only text for accessibility */}
        <span className="sr-only">View details for {conference.title}</span>
      </Link>
    </div>
  );
}
