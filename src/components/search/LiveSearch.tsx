"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  poster: string;
  status: string;
  rating: number;
}

const LiveSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/anime?search=${encodeURIComponent(query)}&limit=6`);
        const data = await res.json();
        setResults(data.anime || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/anime/${id}`);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search anime..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" size={18} />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-accent animate-spin" size={18} />
        )}
        {!isLoading && query && (
          <button
            onClick={() => { setQuery(""); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (query.trim().length >= 2 || results.length > 0) && (
        <div className="absolute top-full mt-2 w-full glass rounded-xl overflow-hidden shadow-2xl z-50 border border-white/5">
          {isLoading ? (
            <div className="p-4 text-center text-dim text-sm">Searching...</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((anime) => (
                <button
                  key={anime.id}
                  onClick={() => handleSelect(anime.id)}
                  className="flex items-center gap-3 p-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                >
                  <img
                    src={anime.poster || "/placeholder-poster.jpg"}
                    alt={anime.title}
                    className="w-10 h-14 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{anime.title}</div>
                    <div className="text-xs text-dim mt-1 flex items-center gap-2">
                      <span className="text-accent">{anime.status}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><span className="text-yellow-400">★</span> {anime.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </button>
              ))}
              <Link
                href={`/catalog?search=${query}`}
                className="p-3 text-center text-xs font-bold text-accent hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                View all results
              </Link>
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center text-dim text-sm">No results found for &quot;{query}&quot;</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LiveSearch;
