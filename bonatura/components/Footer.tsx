import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white group-hover:bg-amber-500 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                BONA<span className="text-amber-500">TURA</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-stone-400">
              Platform inovatif pelestarian dan penjelajahan budaya nusantara berbasis kecerdasan buatan, data spasial, dan partisipasi komunitas adat Indonesia.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Fitur Utama</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/discovery" className="hover:text-amber-400 transition-colors">
                  1. Cultural Discovery
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-amber-400 transition-colors">
                  2. Cultural Map
                </Link>
              </li>
              <li>
                <Link href="/ai-guide" className="hover:text-amber-400 transition-colors">
                  3. AI Cultural Guide
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-amber-400 transition-colors">
                  4. Community Contribution
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-amber-400 transition-colors">
                  5. Personalized Journey
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors">
                  6. Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Integrasi Backend</h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>REST API Golang (Gin) :8080</span>
              </li>
              <li>
                <a
                  href="http://localhost:8080/api/v1/health"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  API Health Check
                </a>
              </li>
              <li>PostgreSQL Knowledge Graph</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} BONATURA. Discover Culture, Experience Heritage. All rights reserved.</p>
          <p>Dibangun untuk melestarikan dan memajukan kebudayaan Nusantara.</p>
        </div>
      </div>
    </footer>
  );
}

