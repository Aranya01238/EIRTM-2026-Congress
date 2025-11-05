"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      duration: number;
      delay: number;
    }>
  >([]);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const numParticles = 35;
    const numCols = 7;
    const numRows = Math.ceil(numParticles / numCols);

    const newParticles = Array.from({ length: numParticles }, (_, i) => {
      const col = i % numCols;
      const row = Math.floor(i / numCols);
      const x = (col / numCols) * 100 + 100 / (2 * numCols);
      const y = (row / numRows) * 100 + 100 / (2 * numRows);

      return {
        id: i,
        x: x,
        y: y,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 6,
      };
    });
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      const xTilt = e.clientX - rect.left - rect.width / 2;
      const yTilt = e.clientY - rect.top - rect.height / 2;
      const rotateY = (xTilt / (rect.width / 2)) * -6;
      const rotateX = (yTilt / (rect.height / 2)) * 6;
      setRotate({ x: rotateX, y: rotateY });

      const xSpot = e.clientX - rect.left;
      const ySpot = e.clientY - rect.top;
      setMousePos({ x: xSpot, y: ySpot });
    };

    const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

    const currentRef = sectionRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 [perspective:1000px]"
    >
      {/* Background Image */}
      <Image
        src="/image.png"
        alt="Background"
        fill
        className="object-cover z-0 brightness-[0.95]"
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0F7FA] via-[#E1F5FE] to-[#B2EBF2] opacity-90 z-10"></div>

      {/* Subtle Spotlight Following Mouse */}
      <div
        className="absolute inset-0 z-20 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 80%)`,
        }}
      ></div>

      {/* Floating Glow Particles */}
      <div className="absolute inset-0 z-30">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-70 shadow-[0_0_8px_2px_rgba(103,232,249,0.4)] animate-float-slow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Card */}
      <div
        className="relative z-40 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_0_60px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_80px_-10px_rgba(103,232,249,0.3)] transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/gallery/cropped-eirtmlogo.jpeg"
            alt="EIRTM Logo"
            width={150}
            height={150}
            className="object-contain drop-shadow-[0_0_12px_rgba(0,150,200,0.3)] animate-fade-in-up"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold text-[#0B3954] mb-4 animate-fade-in-up leading-tight">
          EIRTM <span className="text-cyan-600">2026 Congress</span>
        </h1>

        <div
          className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        ></div>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-gray-700 mb-3 font-light animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          International Conference on Emerging Innovations in Research,
          Technology, and Management
        </p>

        <p
          className="text-md sm:text-lg text-cyan-700 mb-10 font-semibold font-poppins animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          21st – 23rd April, 2026 | Institute of Engineering & Management,
          Kolkata, India
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            href="https://eirtm-2026-technical.vercel.app/"
            className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
          >
            🧠 International Conference on Emerging Computing and Innovative
            Technologies - ICECIT, 2026
          </Link>
          <Link
            href="https://eirtm-2026-management.vercel.app/"
            className="px-10 py-4 border-2 border-cyan-600 text-cyan-700 font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-600 hover:text-white hover:scale-105 shadow-md hover:shadow-cyan-600/30"
          >
            💼 International Conference on Economics, Business and Management -
            ICEBM, 2026
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-2 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
        <svg
          className="w-8 h-8 text-cyan-500 drop-shadow-[0_0_6px_rgba(103,232,249,0.6)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
