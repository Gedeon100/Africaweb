import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, Sparkles, Upload, Settings } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

interface VideoPresentationProps {
  onOpenOwnerDashboard?: () => void;
}

export const VideoPresentation: React.FC<VideoPresentationProps> = ({ onOpenOwnerDashboard }) => {
  const { videoPresentation, isOwnerLoggedIn } = useAgency();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="presentation-video" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#073587] bg-blue-50 px-3 py-1.5 rounded-md mb-2 border border-blue-100">
            <Video className="w-3.5 h-3.5 text-amber-500" />
            <span>Vidéo de Présentation Officielle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {videoPresentation.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
            {videoPresentation.subtitle}
          </p>

          {isOwnerLoggedIn && onOpenOwnerDashboard && (
            <div className="mt-3">
              <button
                onClick={onOpenOwnerDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Modifier ou importer une nouvelle vidéo depuis votre appareil</span>
              </button>
            </div>
          )}
        </div>

        {/* Video Player Frame with Browser / Android-friendly controls */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 relative group">
          {/* Top Browser Bar */}
          <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">
                africa-web.com/video-presentation.mp4
              </span>
            </div>
            {videoPresentation.duration && (
              <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {videoPresentation.duration}
              </span>
            )}
          </div>

          {/* HTML5 Video */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoPresentation.videoUrl}
              className="w-full h-full object-contain"
              playsInline
              controls={false}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
            />

            {/* Big Center Play Button Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-slate-950/40 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-[1px]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-1" />
                </div>
              </div>
            )}

            {/* Custom Bar Controls (Accessible on Mobile & Android) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-3 text-white opacity-95 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Lecture'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
                  Africa Web · Démonstration Vidéo
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFullScreen}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors cursor-pointer"
                  aria-label="Plein écran"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
