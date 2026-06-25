export const dynamic = "force-dynamic";
import HeroSlider from "@/components/home/HeroSlider";
import AnimeRow from "@/components/home/AnimeRow";
import { FireExtinguisher, Heart, Zap, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getHomeData() {
  const [featured, trending, popular, newEpisodes] = await Promise.all([
    prisma.anime.findMany({ take: 5, orderBy: { rating: "desc" }, include: { genres: true } }),
    prisma.anime.findMany({ take: 10, orderBy: { createdAt: "desc" }, include: { genres: true } }),
    prisma.anime.findMany({ take: 10, orderBy: { updatedAt: "desc" }, include: { genres: true } }),
    prisma.anime.findMany({ where: { status: "AIRING" }, take: 10, include: { genres: true } }),
  ]);

  return { featured, trending, popular, newEpisodes };
}


export default async function Home() {
  const { featured, trending, popular, newEpisodes } = await getHomeData();

  return (
    <main className="min-h-screen bg-deepbg">
      <HeroSlider anime={featured} />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <AnimeRow
          title="Trending Now"
          anime={trending}
          icon={<FireExtinguisher size={24} />}
          viewAllHref="/catalog?sort=trending"
        />

        <AnimeRow
          title="Most Popular"
          anime={popular}
          icon={<Heart size={24} />}
          viewAllHref="/catalog?sort=popular"
        />

        <AnimeRow
          title="New Episodes"
          anime={newEpisodes}
          icon={<Zap size={24} />}
          viewAllHref="/catalog?status=airing"
        />
      </div>
    </main>
  );
}
