import Link from "next/link";
import { Play, Plus, Star } from "lucide-react";

interface AnimeCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  episodesCount: number;
  genres: { name: string }[];
}

const AnimeCard = ({ id, title, poster, rating, episodesCount, genres }: AnimeCardProps) => {
  return (
    <div className="group relative w-[180px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
      <Link href={`/anime/${id}`}>
        <div className="relative aspect-[3/4.2] w-full overflow-hidden">
          <img
            src={poster || "/placeholder-poster.jpg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-110">
              <Play size={16} fill="currentColor" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-transform hover:scale-110 backdrop-blur-md">
              <Plus size={16} />
            </button>
          </div>

          <div className="absolute top-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white flex items-center gap-1 backdrop-blur-sm">
            <Star size={10} className="text-yellow-400" fill="currentColor" />
            {rating.toFixed(1)}
          </div>
        </div>

        <div className="p-3">
          <h3 className="truncate text-sm font-semibold text-white group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="mt-1 truncate text-[11px] text-dim">
            {genres.map(g => g.name).slice(0, 2).join(", ")} • {episodesCount} Eps
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard;
