export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Play, Calendar, Clock } from "lucide-react";

async function getRecentEpisodes() {
  return await prisma.episode.findMany({
    take: 20,
    include: {
      anime: true,
      videos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function EpisodeManager() {
  const episodes = await getRecentEpisodes();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Episode Manager</h1>
          <p className="text-dim">Upload, schedule, and manage episodes for your anime series.</p>
        </div>
        <button className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
          <Plus size={18} />
          Add Episode
        </button>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Episode</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Anime</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider hidden md:table-cell">Release Date</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider hidden lg:table-cell">Duration</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Quality</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {episodes.map((ep) => (
              <tr key={ep.id} className="hover:bg-white/3 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-deepbg border border-white/5 flex items-center justify-center text-accent font-bold">
                      {ep.number}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate">
                        {ep.title || `Episode ${ep.number}`}
                      </div>
                      <div className="text-[11px] text-dim flex items-center gap-1">
                         <Play size={10} /> 4.2k views
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-dim truncate max-w-[200px]">
                  {ep.anime.title}
                </td>
                <td className="p-4 hidden md:table-cell text-sm text-dim">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {ep.airDate?.toLocaleDateString() || "TBA"}
                  </div>
                </td>
                <td className="p-4 hidden lg:table-cell text-sm text-dim">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {ep.duration ? `${ep.duration}m` : "TBA"}
                  </div>
                </td>
                <td className="p-4">
                   <div className="flex gap-1">
                     {ep.videos.map(v => (
                       <span key={v.id} className="text-[10px] font-bold bg-white/5 px-1.5 py-0.5 rounded text-dim">
                         {v.quality}
                       </span>
                     ))}
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
            {episodes.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-dim italic">
                  No episodes managed yet. Add an episode to an existing anime!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
