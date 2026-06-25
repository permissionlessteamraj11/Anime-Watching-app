"use client";

import { useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

interface CommentSectionProps {
  animeId?: string;
  episodeId?: string;
  initialComments?: Comment[];
}

const CommentSection = ({ animeId, episodeId, initialComments = [] }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Mock local update
    const comment: Comment = {
      id: Math.random().toString(),
      text: newComment,
      createdAt: new Date().toISOString(),
      user: {
        name: "You",
      },
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-12 bg-card rounded-2xl p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare size={24} className="text-accent" />
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-deepbg border border-white/10 rounded-xl p-4 text-white placeholder:text-dim focus:outline-none focus:border-accent min-h-[100px] transition-all"
          />
          <button
            type="submit"
            className="absolute bottom-4 right-4 bg-accent hover:bg-accent/90 text-white p-2 rounded-lg transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              {comment.user.image ? (
                <img src={comment.user.image} alt={comment.user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={20} className="text-dim" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-white">{comment.user.name}</span>
                <span className="text-[11px] text-dim">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-dim leading-relaxed">{comment.text}</p>
              <div className="mt-2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[11px] font-bold text-dim hover:text-accent uppercase tracking-wider">Reply</button>
                <button className="text-[11px] font-bold text-dim hover:text-accent uppercase tracking-wider">Report</button>
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-8 text-dim italic">
            No comments yet. Be the first to start the discussion!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
