import StatCard from "@/components/admin/StatCard";
import { Users, Tv, Play, Eye } from "lucide-react";

export default function VerifyAdminPage() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard Verification</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,234" icon={<Users size={24} />} trend="+12%" />
        <StatCard title="Total Anime" value="456" icon={<Tv size={24} />} trend="+5%" />
        <StatCard title="Total Episodes" value="8,901" icon={<Play size={24} />} trend="+18%" />
        <StatCard title="Daily Visitors" value="45,678" icon={<Eye size={24} />} trend="+24%" />
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Sample Table Styling</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="pb-3">Name</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-4">Blade of Eternity</td>
              <td className="py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span></td>
              <td className="py-4 text-blue-400">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
