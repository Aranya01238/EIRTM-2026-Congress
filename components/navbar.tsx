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
    { label: "Gallery", href: "#gallery" },
    { label: "Previous Conferences", href: "#conferences" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-lg bg-[#e6faff]/70 shadow-[0_0_20px_rgba(103,232,249,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-white/40 backdrop-blur-md border border-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.3)] flex items-center justify-center">
              <img
                src="https://www.facultyplus.com/wp-content/uploads/2024/11/IEM-Logo-2019-4-2-1024x714.png"
                alt="IEM Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative font-poppins text-[15px] tracking-wide font-semibold text-[#0b3954] hover:text-cyan-500 transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 group-hover:w-full transition-all duration-500 shadow-[0_0_6px_rgba(103,232,249,0.8)]"></span>
              </Link>
            ))}
          </div>

          {/* Right Logo */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-white/40 backdrop-blur-md border border-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.3)] flex items-center justify-center">
              <img
                src="https://uemcyclothon.uem.edu.in/Pictures/nav-2.png"
                alt="UEM Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
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
          <div className="md:hidden py-4 space-y-2 border-t border-cyan-200/40 bg-white/60 backdrop-blur-xl rounded-b-2xl shadow-[0_0_20px_rgba(103,232,249,0.3)] animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-center text-[#0b3954] font-semibold text-base tracking-wide py-3 rounded-lg relative group transition-all duration-300 hover:text-cyan-500"
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-0.5 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-3/4 transition-all duration-500 shadow-[0_0_8px_rgba(103,232,249,0.8)]"></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
