import AnimeCard from "./AnimeCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface AnimeRowProps {
  title: string;
  anime: any[];
  viewAllHref?: string;
  icon?: React.ReactNode;
}

const AnimeRow = ({ title, anime, viewAllHref, icon }: AnimeRowProps) => {
  return (
    <section className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-heading text-xl md:text-2xl font-bold text-white">
          {icon && <span className="text-accent">{icon}</span>}
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View All
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto pb-4">
        {anime.map((item) => (
          <AnimeCard
            key={item.id}
            id={item.id}
            title={item.title}
            poster={item.poster}
            rating={item.rating}
            episodesCount={item.episodesCount}
            genres={item.genres}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimeRow;
