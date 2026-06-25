export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Check, X, Trash2, AlertCircle } from "lucide-react";

async function getPendingComments() {
  return await prisma.comment.findMany({
    take: 20,
    include: {
      user: true,
      anime: true,
      episode: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CommentModeration() {
  const comments = await getPendingComments();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Comment Moderation</h1>
        <p className="text-dim">Approve, reject, or delete user comments to maintain a healthy community.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button className="bg-accent px-4 py-2 rounded-xl text-sm font-bold text-white">Pending (12)</button>
        <button className="bg-white/5 px-4 py-2 rounded-xl text-sm font-bold text-dim hover:text-white transition-all">Approved</button>
        <button className="bg-white/5 px-4 py-2 rounded-xl text-sm font-bold text-dim hover:text-white transition-all">Reported</button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-card border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                   <img
                    src={comment.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`}
                    className="w-full h-full rounded-full object-cover"
                    alt={comment.user.name || ""}
                   />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    {comment.user.name || "Anonymous"}
                    <span className="text-dim font-normal ml-2 text-xs">
                      on {comment.anime?.title || comment.episode?.title || "Unknown Content"}
                    </span>
                  </div>
                  <div className="text-[11px] text-dim">{comment.createdAt.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-accent2/10 text-accent2 flex items-center justify-center hover:bg-accent2/20 transition-all">
                  <Check size={18} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center hover:bg-accent/20 transition-all">
                  <X size={18} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/5 text-dim flex items-center justify-center hover:text-white transition-all">
                   <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-sm text-dim leading-relaxed bg-deepbg/50 p-4 rounded-xl border border-white/5 italic">
              &quot;{comment.text}&quot;
            </p>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <AlertCircle size={40} className="mx-auto text-dim mb-4 opacity-20" />
            <p className="text-dim italic">No comments awaiting moderation. All clean!</p>
          </div>
        )}
      </div>
    </div>
  );
}
