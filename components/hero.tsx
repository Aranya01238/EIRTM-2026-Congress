"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; duration: number; delay: number }>
  >([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Particles + Mouse Spotlight
  useEffect(() => {
    const numParticles = 30;
    const newParticles = Array.from({ length: numParticles }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 6,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const current = sectionRef.current;
    if (current) current.addEventListener("mousemove", handleMouseMove);

    return () => current?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 
      bg-[#030616]"
    >
      {/* Sliding Background Images */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-50 sm:opacity-70">
        <div className="absolute w-[250%] sm:w-[200%] h-full flex animate-slide">
          <Image
            src="/gallery/1Gm7gO.png"
            alt="Conference Hall"
            width={2000}
            height={1000}
            className="w-1/2 object-cover"
            priority
          />
          <Image
            src="/gallery/paris-event-theme.png"
            alt="Keynote Speakers"
            width={2000}
            height={1000}
            className="w-1/2 object-cover"
            priority
          />
        </div>
      </div>

      {/* Neon Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001933aa] via-[#001233aa] to-[#000622aa] z-10" />

      {/* Spotlight */}
      <div
        className="absolute inset-0 z-20 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.18), transparent 80%)`,
        }}
      />

      {/* Floating Neon Particles */}
      <div className="absolute inset-0 z-30">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-300 rounded-full opacity-70 
            shadow-[0_0_12px_3px_rgba(0,255,255,0.5)] animate-float-slow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CENTER TEXT AREA */}
      <div className="absolute z-40 inset-x-0 top-[18%] px-4 sm:px-6 md:px-10">
        <div
          className="bg-black/50 backdrop-blur-md mx-auto max-w-5xl p-6 sm:p-10 rounded-lg 
        text-center shadow-xl border border-white/10"
        >
          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image
              src="/gallery/EUROPEAN ON.png"
              alt="EIRTM Logo"
              width={140}
              height={140}
              className="drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            />
          </div>

          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            EIRTM 2026
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed mb-3">
            European Congress on Interdisciplinary Research in Technology and
            Management
          </h2>

          <p className="text-base sm:text-lg md:text-xl italic text-gray-200 mb-1">
            In association with The Photovoltaic Institute of Île-de-France,
            France
          </p>

          <p className="text-base sm:text-xl md:text-2xl font-bold text-white">
            EMLV - The Leonard De Vinci Business School, Paris
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
            <Link
              href="https://eirtm-2026-technical.vercel.app/"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 
              text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 
              shadow-[0_0_18px_rgba(0,255,255,0.4)] text-center text-sm sm:text-base"
            >
              🧠 ICECIT 2026 — Emerging Computing & Innovative Tech
            </Link>

            <Link
              href="https://eirtm-2026-management.vercel.app/"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 
              text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 
              shadow-[0_0_18px_rgba(0,255,255,0.4)] text-center text-sm sm:text-base"
            >
              💼 ICEBM 2026 — Economics, Business & Management
            </Link>
          </div>
        </div>
      </div>

      {/* DATE BAR */}
      <div className="absolute z-40 bottom-0 w-full">
        <div className="bg-black/80 text-white text-center py-3 text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
          Conference On: 21st – 23rd April, 2026
        </div>
      </div>
    </section>
  );
}
