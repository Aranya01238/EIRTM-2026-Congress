"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Timeline", href: "#timeline" },
    { label: "Gallery", href: "#gallery" },
    { label: "Previous Conferences", href: "#conferences" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-[#030616]/70 border-b border-cyan-300/25 shadow-[0_0_30px_rgba(0,255,255,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand / Title (replaces logos) */}
          <div className="flex items-center">
            <Link href="#home" className="flex items-center gap-3 group">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.7)] group-hover:scale-110 transition" />
              <span className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                <img
                  src="/gallery/EUROPEAN ON.png"
                  alt="EIRTM Logo"
                  width={140}
                  height={140}
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative font-poppins text-[15px] tracking-wide font-semibold text-cyan-100/90 hover:text-cyan-400 transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 group-hover:w-full transition-all duration-500 shadow-[0_0_6px_rgba(103,232,249,0.8)]"></span>
              </Link>
            ))}
          </div>

          {/* Right CTA glow */}
          <div className="hidden md:flex items-center">
            <Link
              href="#contact"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/40 text-cyan-100 font-semibold shadow-[0_0_20px_rgba(0,255,255,0.25)] hover:shadow-[0_0_35px_rgba(0,255,255,0.45)] hover:bg-cyan-500/40 transition"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-600 hover:text-cyan-400 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-cyan-400/30 bg-[#06101a]/80 backdrop-blur-xl rounded-b-2xl shadow-[0_0_25px_rgba(0,255,255,0.35)] animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-center text-cyan-100 font-semibold text-base tracking-wide py-3 rounded-lg relative group transition-all duration-300 hover:text-cyan-400"
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-0.5 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-3/4 transition-all duration-500 shadow-[0_0_8px_rgba(103,232,249,0.8)]"></span>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Bottom neon separator */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-cyan-400/40" />
      )}
    </nav>
  );
}
