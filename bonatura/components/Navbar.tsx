"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MapPin,
  Bot,
  Users,
  Route,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/discovery", label: "Discovery", icon: Compass },
    { href: "/map", label: "Cultural Map", icon: MapPin },
    { href: "/ai-guide", label: "AI Guide", icon: Bot },
    { href: "/journey", label: "Journey", icon: Route },
    { href: "/community", label: "Komunitas", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#D6C4A8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B85C38] via-[#964728] to-[#795548] flex items-center justify-center text-[#F8F5EF] shadow-md shadow-[#795548]/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#2C1A14]">
                BONA<span className="text-[#B85C38]">TURA</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-[#795548] uppercase">
                Discover Culture, Experience Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#D6C4A8] text-[#2C1A14] font-bold shadow-xs border border-[#D6C4A8]"
                      : "text-[#5D4333] hover:text-[#B85C38] hover:bg-[#D6C4A8]/30"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#B85C38]" : "text-[#795548]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border ${
                pathname === "/admin"
                  ? "bg-[#795548] text-[#F8F5EF] border-[#795548] shadow-sm"
                  : "text-[#3E2723] bg-[#D6C4A8]/40 hover:bg-[#D6C4A8] border-[#D6C4A8]"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </Link>
            <Link
              href="/discovery"
              className="px-4 py-2 text-xs font-semibold text-[#F8F5EF] bg-[#B85C38] hover:bg-[#964728] rounded-lg shadow-sm shadow-[#B85C38]/20 transition-all flex items-center gap-1.5"
            >
              Mulai Eksplorasi
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 text-[#3E2723] bg-[#D6C4A8]/40 rounded-lg border border-[#D6C4A8]"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3E2723] hover:text-[#B85C38] hover:bg-[#D6C4A8]/30 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D6C4A8] bg-[#F8F5EF] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#D6C4A8] text-[#2C1A14] font-bold"
                    : "text-[#5D4333] hover:bg-[#D6C4A8]/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#B85C38]" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#795548]" />
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#D6C4A8] flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#3E2723] bg-[#D6C4A8]/50 hover:bg-[#D6C4A8] rounded-xl text-center flex items-center justify-center gap-2 border border-[#D6C4A8]"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </Link>
            <Link
              href="/discovery"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-bold text-[#F8F5EF] bg-[#B85C38] hover:bg-[#964728] rounded-xl text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Mulai Eksplorasi
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
