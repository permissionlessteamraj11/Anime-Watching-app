export const dynamic = "force-dynamic";
import {
  Users,
  Film,
  Play,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Database
} from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [userCount, animeCount, episodeCount] = await Promise.all([
    prisma.user.count(),
    prisma.anime.count(),
    prisma.episode.count(),
  ]);

  return [
    { label: "Total Users", value: userCount.toLocaleString(), icon: <Users size={20} />, change: "+12%", color: "text-accent2", bg: "bg-accent2/10" },
    { label: "Total Anime", value: animeCount.toLocaleString(), icon: <Film size={20} />, change: "+3", color: "text-accent", bg: "bg-accent/10" },
    { label: "Total Episodes", value: episodeCount.toLocaleString(), icon: <Play size={20} />, change: "+28", color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Daily Visitors", value: "8.2K", icon: <Eye size={20} />, change: "+18%", color: "text-blue-400", bg: "bg-blue-400/10" },
  ];
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-dim">Welcome back, Admin. Here&apos;s what&apos;s happening with AnimeVerse today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.color}`}>
                {stat.change}
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-dim">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Mock Charts or placeholders */}
        <div className="bg-card border border-white/5 rounded-2xl p-6 h-80 flex flex-col">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <TrendingUp size={20} className="text-accent" />
             User Growth
           </h3>
           <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
             <p className="text-dim italic">Chart integration (Chart.js/Recharts) goes here</p>
           </div>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-6 h-80 flex flex-col">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Activity size={20} className="text-accent2" />
             Watch Time (Hours)
           </h3>
           <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
             <p className="text-dim italic">Chart integration (Chart.js/Recharts) goes here</p>
           </div>
        </div>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Database size={20} className="text-yellow-400" />
          Server Health
        </h3>
        <div className="space-y-6">
          <HealthBar label="CPU Usage" value={34} color="bg-accent2" />
          <HealthBar label="Memory" value={62} color="bg-yellow-400" />
          <HealthBar label="Storage" value={48} color="bg-accent" />
          <HealthBar label="Bandwidth" value={71} color="bg-blue-400" />
        </div>
      </div>
    </div>
  );
}

function HealthBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-dim">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
