export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Play, Plus, Heart, Share2, Star, Film, Calendar, Tv } from "lucide-react";
import Link from "next/link";
import CommentSection from "@/components/community/CommentSection";
import ReviewSection from "@/components/community/ReviewSection";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const anime = await prisma.anime.findUnique({ where: { id } });

  if (!anime) return { title: "Anime Not Found" };

  return {
    title: `${anime.title} - AnimeVerse Pro`,
    description: anime.synopsis.substring(0, 160),
    openGraph: {
      title: anime.title,
      description: anime.synopsis.substring(0, 160),
      images: [anime.poster || "/og-image.jpg"],
    },
  };
}

async function getAnime(id: string) {
  const anime = await prisma.anime.findUnique({
    where: { id },
    include: {
      genres: true,
      studios: true,
      episodes: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
  return anime;
}

export default async function AnimeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const anime = await getAnime(id);

  if (!anime) notFound();

  return (
    <main className="min-h-screen bg-deepbg pb-12">
      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img
          src={anime.banner || "/placeholder-banner.jpg"}
          className="w-full h-full object-cover"
          alt={anime.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepbg via-deepbg/60 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.poster || "/placeholder-poster.jpg"}
              className="w-48 md:w-64 rounded-2xl shadow-2xl border-2 border-white/10"
              alt={anime.title}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-16">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="bg-accent px-3 py-1 rounded-md text-xs font-bold text-white uppercase">
                {anime.status}
              </span>
              {anime.genres.map((g) => (
                <span key={g.id} className="text-xs text-dim bg-white/5 px-2 py-1 rounded-md border border-white/5">
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-5xl mb-1 text-white">
              {anime.title}
            </h1>
            <p className="text-dim text-lg mb-4 italic">{anime.titleJp}</p>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
              <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
                <Star size={16} fill="currentColor" /> {anime.rating.toFixed(1)}
              </span>
              <span className="text-dim flex items-center gap-1.5">
                <Film size={16} /> {anime.studios.map(s => s.name).join(", ")}
              </span>
              <span className="text-dim flex items-center gap-1.5">
                <Calendar size={16} /> {anime.releaseDate?.getFullYear() || "TBA"}
              </span>
              <span className="text-dim flex items-center gap-1.5">
                <Tv size={16} /> {anime.episodesCount} Episodes
              </span>
            </div>

            <p className="text-dim leading-relaxed max-w-3xl mb-8 text-base">
              {anime.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/watch/${anime.id}/1`}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-accent/25"
              >
                <Play size={20} fill="currentColor" /> Watch Now
              </Link>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center gap-2">
                <Plus size={20} /> Watchlist
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all">
                <Heart size={20} />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div className="mt-16">
          <h2 className="font-heading font-bold text-2xl mb-6 text-white flex items-center gap-2">
            <span className="w-1.5 h-8 bg-accent rounded-full" />
            Episodes
          </h2>
          <div className="grid gap-3 max-w-4xl">
            {anime.episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/watch/${anime.id}/${ep.number}`}
                className="group glass rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-all border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-dim group-hover:bg-accent group-hover:text-white transition-all flex-shrink-0 font-bold">
                  {ep.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white group-hover:text-accent transition-colors truncate">
                    {ep.title || `Episode ${ep.number}`}
                  </div>
                  <div className="text-xs text-dim flex items-center gap-3 mt-1">
                    <span>{ep.duration ? `${ep.duration} mins` : "Duration TBA"}</span>
                    <span>•</span>
                    <span>{ep.airDate?.toLocaleDateString() || "Release TBA"}</span>
                  </div>
                </div>
                <Play size={18} className="text-dim opacity-0 group-hover:opacity-100 transition-all group-hover:text-accent" />
              </Link>
            ))}
            {anime.episodes.length === 0 && (
              <p className="text-dim italic">No episodes available yet.</p>
            )}
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-16 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <CommentSection animeId={anime.id} />
          </div>
          <div>
            <ReviewSection animeId={anime.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
