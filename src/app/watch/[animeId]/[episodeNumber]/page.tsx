export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/player/VideoPlayer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

async function getEpisode(animeId: string, episodeNumber: number) {
  const episode = await prisma.episode.findFirst({
    where: {
      animeId,
      number: episodeNumber,
    },
    include: {
      anime: true,
      videos: true,
    },
  });
  return episode;
}

export default async function WatchPage({
  params
}: {
  params: Promise<{ animeId: string; episodeNumber: string }>
}) {
  const { animeId, episodeNumber } = await params;
  const episode = await getEpisode(animeId, parseInt(episodeNumber));

  if (!episode) notFound();

  const videoUrl = episode.videos[0]?.url || "";

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <Link
          href={`/anime/${animeId}`}
          className="inline-flex items-center gap-2 text-dim hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Anime Details
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <VideoPlayer src={videoUrl} poster={episode.anime.banner || undefined} />

            <div className="mt-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                {episode.anime.title} - Episode {episode.number}
              </h1>
              <p className="text-dim">{episode.title}</p>
            </div>
          </div>

          <div className="lg:w-80 flex flex-col gap-6">
            <div className="bg-card rounded-xl p-6 border border-white/5">
              <h3 className="font-heading font-bold text-white mb-4">Episodes</h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: episode.anime.episodesCount }, (_, i) => i + 1).map((num) => (
                  <Link
                    key={num}
                    href={`/watch/${animeId}/${num}`}
                    className={`py-2 rounded-lg text-center font-bold transition-all ${
                      num === episode.number
                        ? "bg-accent text-white"
                        : "bg-white/5 text-dim hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {num}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
