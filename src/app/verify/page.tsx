import HeroSlider from "@/components/home/HeroSlider";
import AnimeRow from "@/components/home/AnimeRow";
import { FireExtinguisher, Heart, Zap } from "lucide-react";

const mockAnime = [
  {
    id: "1",
    title: "Blade of Eternity",
    titleJp: "永遠の剣",
    synopsis: "In a world where ancient swords hold the power of gods...",
    banner: "https://picsum.photos/seed/banner1/1920/1080",
    poster: "https://picsum.photos/seed/poster1/300/420",
    status: "AIRING",
    rating: 9.2,
    episodesCount: 24,
    genres: [{ name: "Action" }, { name: "Fantasy" }],
  },
  {
    id: "2",
    title: "Starfall Academy",
    titleJp: "星降り学园",
    synopsis: "When a regular student is accidentally enrolled...",
    banner: "https://picsum.photos/seed/banner2/1920/1080",
    poster: "https://picsum.photos/seed/poster2/300/420",
    status: "AIRING",
    rating: 8.7,
    episodesCount: 12,
    genres: [{ name: "Sci-Fi" }, { name: "Comedy" }],
  },
];

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-deepbg">
      <HeroSlider anime={mockAnime} />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <AnimeRow
          title="Trending Now"
          anime={mockAnime}
          icon={<FireExtinguisher size={24} />}
          viewAllHref="#"
        />

        <AnimeRow
          title="Most Popular"
          anime={mockAnime}
          icon={<Heart size={24} />}
          viewAllHref="#"
        />
      </div>
    </main>
  );
}
