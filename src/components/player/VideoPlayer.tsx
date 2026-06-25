"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, SkipBack } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ src, poster, onEnded }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls;

    if (Hls.isSupported() && src.endsWith(".m3u8")) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      video.src = src; // Fallback for mp4
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div
      className="relative aspect-video w-full bg-black group overflow-hidden rounded-xl shadow-2xl"
      onMouseMove={() => {
        setShowControls(true);
        // Hide controls after 3 seconds of inactivity
        setTimeout(() => setShowControls(false), 3000);
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onClick={togglePlay}
        playsInline
      />

      {/* Custom Controls */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 ${showControls ? "opacity-100" : "opacity-0"}`}>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={seek}
          className="w-full h-1.5 mb-4 bg-white/20 appearance-none cursor-pointer accent-accent rounded-full outline-none"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="hover:text-accent transition-colors">
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 appearance-none cursor-pointer accent-white rounded-full"
              />
            </div>

            <span className="text-sm font-medium tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:text-accent transition-colors text-sm font-bold">1x</button>
            <button className="hover:text-accent transition-colors">
              <Settings size={20} />
            </button>
            <button className="hover:text-accent transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Center Play/Pause Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${!isPlaying && !showControls ? "opacity-100" : "opacity-0"}`}>
         <div className="w-20 h-20 rounded-full bg-accent/80 flex items-center justify-center text-white">
            <Play size={40} fill="currentColor" className="ml-2" />
         </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
