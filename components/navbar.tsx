"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  isScrolled: boolean
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Gallery", href: "#gallery" },
    { label: "Previous Conferences", href: "#conferences" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300">
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
                className="text-accent font-medium text-sm relative group px-3 py-2 rounded-lg transition-all duration-300 hover:text-white"
              >
                <span className="absolute inset-0 rounded-lg bg-accent/0 group-hover:bg-accent/20 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">{item.label}</span>
                {/* Neon underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white via-white to-transparent group-hover:w-full transition-all duration-500 shadow-neon-gold"></span>
              </Link>
            ))}
          </div>

          {/* Right Logo */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300">
              <img
                src="https://uemcyclothon.uem.edu.in/Pictures/nav-2.png"
                alt="UEM Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-accent hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-accent hover:text-white rounded-lg transition-all duration-300 relative group border border-accent/30 hover:border-accent/80 hover:bg-accent/15"
                onClick={() => setIsOpen(false)}
              >
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-neon-gold pointer-events-none"></span>
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
