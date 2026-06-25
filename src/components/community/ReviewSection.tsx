"use client";

import { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

interface ReviewSectionProps {
  animeId: string;
  initialReviews?: Review[];
}

const ReviewSection = ({ animeId, initialReviews = [] }: ReviewSectionProps) => {
  const [reviews] = useState<Review[]>(initialReviews);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Star size={24} className="text-yellow-400" fill="currentColor" />
          Reviews ({reviews.length})
        </h2>
        <button className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent/20">
          Write Review
        </button>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  {review.user.image ? (
                    <img src={review.user.image} alt={review.user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User size={20} className="text-dim" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{review.user.name}</div>
                  <div className="text-[11px] text-dim">{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= review.rating ? "text-yellow-400" : "text-dim/20"}
                    fill={star <= review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-dim leading-relaxed mb-6">{review.content}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs font-bold text-dim hover:text-accent transition-colors">
                <ThumbsUp size={14} /> Helpful (0)
              </button>
              <button className="text-xs font-bold text-dim hover:text-accent transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-dim italic">No reviews yet. Share your detailed opinion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
