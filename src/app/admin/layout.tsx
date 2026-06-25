import Link from "next/link";
import {
  LayoutDashboard,
  Film,
  List,
  Users,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-deepbg">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/50 backdrop-blur-xl hidden lg:block sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-10">
            <ShieldCheck className="text-accent" size={24} />
            <span className="font-heading font-bold text-lg text-white">Admin Panel</span>
          </Link>

          <nav className="space-y-1">
            <AdminNavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
            <AdminNavLink href="/admin/anime" icon={<Film size={18} />} label="Anime Manager" />
            <AdminNavLink href="/admin/episodes" icon={<List size={18} />} label="Episodes" />
            <AdminNavLink href="/admin/users" icon={<Users size={18} />} label="Users" />
            <AdminNavLink href="/admin/comments" icon={<MessageSquare size={18} />} label="Comments" />
            <AdminNavLink href="/admin/analytics" icon={<PieChart size={18} />} label="Analytics" />
            <AdminNavLink href="/admin/seo" icon={<Search size={18} />} label="SEO" />
            <AdminNavLink href="/admin/settings" icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-accent/10 text-accent border-l-4 border-accent"
          : "text-dim hover:bg-white/5 hover:text-white border-l-4 border-transparent"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
