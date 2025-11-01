"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

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
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      const xTilt = e.clientX - rect.left - rect.width / 2;
      const yTilt = e.clientY - rect.top - rect.height / 2;
      const rotateY = (xTilt / (rect.width / 2)) * -5;
      const rotateX = (yTilt / (rect.height / 2)) * 5;
      setRotate({ x: rotateX, y: rotateY });

      const xSpot = e.clientX - rect.left;
      const ySpot = e.clientY - rect.top;
      setMousePos({ x: xSpot, y: ySpot });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

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
      {/* Background Image Layer (z-0) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          // UPDATED: Using the provided Paris skyline image
          backgroundImage: "url(/image.png)", // Corrected path for images in the public folder
          backgroundSize: "cover", // Ensures the image covers the whole area
          backgroundPosition: "center 35%", // Centers the image horizontally, 70% down vertically
        }}
      ></div>

      {/* Dark Blue/Black Animated Gradient (z-10) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-950 via-black to-blue-950 bg-[length:200%_200%] opacity-70 animate-gradient-xy"></div>

      {/* Mouse-Follow Spotlight (z-20) */}
      <div
        className="absolute inset-0 z-20 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(103, 232, 249, 0.1), transparent 80%)`,
        }}
      ></div>

      {/* Floating Particles (z-30) */}
      <div className="absolute inset-0 z-30">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-30 animate-float-complex"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Refined Glassmorphism Card (z-40) */}
      <div
        className="relative z-40 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-blue-950/0 backdrop-blur-sm border border-cyan-300/10 shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 animate-fade-in-up bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-text-shine">
          EIRTM 2026 Congress
        </h1>

        <div
          className="h-1 w-24 bg-cyan-300 mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        ></div>

        <p
          className="text-xl sm:text-2xl text-white/90 mb-4 font-light animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          International Conference on Emerging Innovations in Research,
          Technology, and Management
        </p>

        <p
          className="text-lg sm:text-xl text-cyan-300 mb-12 font-poppins font-semibold animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          21st – 23rd April, 2026 | Institute of Engineering & Management,
          Kolkata, India
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            href="https://eirtm-2026-technical.vercel.app/"
            className="px-8 py-4 bg-cyan-300 text-blue-950 font-poppins font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-cyan-300/40"
          >
            🧠 Technical Conference
          </Link>
          <Link
            href="#"
            className="px-8 py-4 border-2 border-cyan-300 text-cyan-300 font-poppins font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-cyan-300 hover:text-blue-950 hover:shadow-lg hover:shadow-cyan-300/30"
          >
            💼 Management Conference
          </Link>
        </div>
      </div>

      {/* Scroll Indicator (z-40) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-cyan-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
