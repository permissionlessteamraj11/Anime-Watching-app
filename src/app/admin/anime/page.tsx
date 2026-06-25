export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import Link from "next/link";

async function getAnimeList() {
  return await prisma.anime.findMany({
    include: {
      genres: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function AnimeManager() {
  const animeList = await getAnimeList();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Anime Manager</h1>
          <p className="text-dim">Manage your content catalog, edit information, and monitor performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
            <Plus size={18} />
            Add Anime
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            Bulk Import
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card border border-white/5 rounded-2xl p-4 mb-8 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search catalog..."
            className="w-full bg-deepbg border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-accent outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" size={16} />
        </div>
        <div className="flex gap-2">
          <button className="bg-deepbg border border-white/10 rounded-xl px-4 py-2 text-sm text-dim hover:text-white flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          <select className="bg-deepbg border border-white/10 rounded-xl px-4 py-2 text-sm text-dim hover:text-white outline-none">
            <option>All Status</option>
            <option>Airing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>
      </div>

      {/* Anime Table */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Anime</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider hidden lg:table-cell">Genres</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Rating</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {animeList.map((anime) => (
              <tr key={anime.id} className="hover:bg-white/3 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={anime.poster || "/placeholder-poster.jpg"}
                      alt={anime.title}
                      className="w-10 h-14 rounded-lg object-cover bg-deepbg"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">
                        {anime.title}
                      </div>
                      <div className="text-[11px] text-dim">{anime.episodesCount} Episodes</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {anime.genres.slice(0, 3).map(g => (
                      <span key={g.id} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-dim">
                        {g.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    anime.status === "AIRING" ? "bg-accent2/10 text-accent2" :
                    anime.status === "COMPLETED" ? "bg-accent/10 text-accent" :
                    "bg-yellow-400/10 text-yellow-400"
                  }`}>
                    {anime.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    {anime.rating.toFixed(1)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-white/5 text-dim hover:text-white hover:bg-white/10 transition-all">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 text-dim hover:text-accent hover:bg-accent/10 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {animeList.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-dim italic">
                  No anime found in catalog. Start by adding your first title!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
