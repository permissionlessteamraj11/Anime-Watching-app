"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeroAnime {
  id: string;
  title: string;
  titleJp?: string | null;
  synopsis: string;
  banner?: string | null;
  status: string;
  rating: number;
}

const HeroSlider = ({ anime }: { anime: HeroAnime[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % anime.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [anime.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % anime.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + anime.length) % anime.length);

  if (!anime.length) return null;

  const current = anime[currentIndex];

  return (
    <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={current.banner || "/placeholder-banner.jpg"}
            alt={current.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17] via-[#0A0E17]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-4 md:px-8 max-w-[1440px] mx-auto z-10">
        <motion.div
          key={`content-${current.id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-accent px-3 py-1 rounded-md text-xs font-bold text-white">
              {current.status}
            </span>
            <span className="text-dim text-sm flex items-center gap-1">
              <span className="text-yellow-400">★</span> {current.rating}
            </span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-2 leading-tight text-white">
            {current.title}
          </h1>
          <p className="text-dim text-lg mb-4 italic">{current.titleJp}</p>
          <p className="text-dim text-sm md:text-base max-w-xl mb-6 line-clamp-3">
            {current.synopsis}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={`/anime/${current.id}`}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              <Play size={20} fill="currentColor" /> Watch Now
            </Link>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
              <Plus size={20} /> My List
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {anime.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-12 bg-accent" : "w-8 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
