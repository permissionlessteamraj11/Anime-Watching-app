export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { User as UserIcon, Shield, Ban, Trash2, Search } from "lucide-react";

async function getUsers() {
  return await prisma.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function UserManagement() {
  const users = await getUsers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">User Management</h1>
        <p className="text-dim">View user activity, manage roles, and handle account status.</p>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl p-4 mb-8 flex gap-4 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-deepbg border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-accent outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" size={16} />
        </div>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">User</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider hidden md:table-cell">Email</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Role</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider hidden lg:table-cell">Joined</th>
              <th className="p-4 text-xs font-bold text-dim uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/3 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      {user.image ? (
                        <img src={user.image} alt={user.name || ""} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <UserIcon size={18} className="text-dim" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-white">{user.name || "Anonymous"}</span>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-sm text-dim">{user.email}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    user.role.name === "SUPERADMIN" ? "bg-accent/10 text-accent" :
                    user.role.name === "ADMIN" ? "bg-accent2/10 text-accent2" :
                    user.role.name === "MODERATOR" ? "bg-yellow-400/10 text-yellow-400" :
                    "bg-white/5 text-dim"
                  }`}>
                    {user.role.name}
                  </span>
                </td>
                <td className="p-4 hidden lg:table-cell text-sm text-dim">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4">
                   <div className="flex gap-2">
                     <button className="p-2 rounded-lg bg-white/5 text-dim hover:text-accent2 transition-all">
                       <Shield size={16} />
                     </button>
                     <button className="p-2 rounded-lg bg-white/5 text-dim hover:text-yellow-400 transition-all">
                       <Ban size={16} />
                     </button>
                     <button className="p-2 rounded-lg bg-white/5 text-dim hover:text-accent transition-all">
                       <Trash2 size={16} />
                     </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
