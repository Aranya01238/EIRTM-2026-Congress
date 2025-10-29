"use client"

import Link from "next/link"
import { Linkedin, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-4">EIRTM 2026</h3>
            <p className="text-white/70 leading-relaxed">
              International Conference on Emerging Innovations in Research, Technology, and Management
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-white/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-white/70 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#conferences" className="text-white/70 hover:text-accent transition-colors">
                  Previous Conferences
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-poppins font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent hover:text-primary flex items-center justify-center transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-center text-white/60 text-sm">
            <p>© 2026 EIRTM Congress | Organized by IEM Kolkata | In association with Smart Society</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
