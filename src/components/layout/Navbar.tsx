"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Bell, User, Menu, Moon, Sun } from "lucide-react";
import LiveSearch from "../search/LiveSearch";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-deepbg/90 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-110">
            <Play size={20} fill="currentColor" className="text-white ml-1" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white">
            AnimeVerse<span className="text-accent">Pro</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-dim">
          <Link href="/" className="hover:text-white transition-colors text-white">Home</Link>
          <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <Link href="/schedule" className="hover:text-white transition-colors">Schedule</Link>
          <Link href="/community" className="hover:text-white transition-colors">Community</Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <LiveSearch />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-dim hover:text-white transition-colors hidden sm:block">
            <Bell size={20} />
          </button>
          <Link
            href="/profile"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-dim hover:text-accent hover:border-accent transition-all"
          >
            <User size={20} />
          </Link>
          <button className="lg:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
