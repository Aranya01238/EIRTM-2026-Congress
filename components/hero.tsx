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
    const numParticles = 35;
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

    return () => {
      if (current) current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030616]"
    >
      {/* 🔵 Sliding Background Images */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[200%] h-full flex animate-slide">
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

      {/* 🔵 Neon Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001933aa] via-[#001233aa] to-[#000622aa] z-10"></div>

      {/* 🔵 Spotlight Following Mouse */}
      <div
        className="absolute inset-0 z-20 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.18), transparent 80%)`,
        }}
      ></div>

      {/* 🔵 Neon Floating Particles */}
      <div className="absolute inset-0 z-30">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-70 shadow-[0_0_15px_3px_rgba(0,255,255,0.5)] animate-float-slow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* 🔶 TEXT SECTION (Matches Screenshot + Buttons Added)   */}
      {/* ====================================================== */}

      <div className="absolute z-40 inset-x-0 top-[22%] px-4">
        <div className="bg-black/60 backdrop-blur-md mx-auto max-w-6xl p-8 rounded-md text-center shadow-xl border border-white/10">
          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image
              src="/gallery/cropped-eirtmlogo.jpeg"
              alt="EIRTM Logo"
              width={140}
              height={140}
              className="drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            />
          </div>

          {/* EIRTM Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            EIRTM 2026
          </h1>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            European Congress on Interdisciplinary Research in Technology and
            Management (EIRTM, 2026)
          </h2>

          {/* Sub-title */}
          <p className="text-xl sm:text-2xl italic text-gray-200 mb-2">
            In association with The Photovoltaic Institute of Île-de-France,
            France
          </p>

          {/* Bold Line */}
          <p className="text-xl sm:text-2xl font-bold text-white">
            EMLV - The Leonard De Vinci Business School Paris, France
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            <Link
              href="https://eirtm-2026-technical.vercel.app/"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl
               transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]
               hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] text-center"
            >
              🧠 International Conference on Emerging Computing and Innovative
              Technologies — ICECIT 2026
            </Link>

            <Link
              href="https://eirtm-2026-management.vercel.app/"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl
               transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)]
               hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] text-center"
            >
              💼 International Conference on Economics, Business and Management
              — ICEBM 2026
            </Link>
          </div>
        </div>
      </div>

      {/* DATE BAR */}
      <div className="absolute z-40 bottom-10 inset-x-0">
        <div className="bg-black/80 text-white text-center w-full py-4 text-xl sm:text-2xl font-bold tracking-wide">
          Conference On: 21st – 23rd April, 2026
        </div>
      </div>
    </section>
  );
}
