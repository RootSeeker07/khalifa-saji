import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface DynamicFoodThumbProps {
  name: string;
  category: string;
  image?: string;
  tag?: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | 'square';
}

export const DynamicFoodThumb: React.FC<DynamicFoodThumbProps> = ({
  name,
  category,
  image,
  tag,
  className = '',
  aspectRatio = '4/3',
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Derive initials or short title for stylized typographical overlay
  const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  const primaryTitle = words.slice(0, 3).join(' ');
  const secondaryTitle = words.slice(3, 6).join(' ');

  // Determine accent theme based on category
  const getGradient = () => {
    switch (category) {
      case 'sajji-fish':
        return 'from-amber-950 via-[#1c140d] to-[#0f0f13] border-amber-500/20';
      case 'karahi-handi':
        return 'from-red-950 via-[#1c0f11] to-[#0f0f13] border-red-500/20';
      case 'barbeque':
        return 'from-orange-950 via-[#1c120c] to-[#0f0f13] border-orange-500/20';
      default:
        return 'from-[#1c1a17] via-[#15161b] to-[#0f0f13] border-amber-500/15';
    }
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  const showRealImage = Boolean(image && !imageError);

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-xl bg-[#14151b] ${className}`}
    >
      {showRealImage ? (
        <>
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Measured gradient scrim for visual contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-[#0e0f13]/30 to-transparent pointer-events-none" />
        </>
      ) : null}

      {/* Stylized fallback visual frame if image is missing or failed to load */}
      {(!showRealImage || !imageLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br ${getGradient()} border-b transition-transform duration-500 group-hover:scale-[1.02]`}
        >
          {/* Background subtle patterned mesh */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]"
          />

          {/* Top kicker */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] tracking-wider uppercase text-amber-400/80 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Authentic Desi</span>
            </span>
            {tag && (
              <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                {tag}
              </span>
            )}
          </div>

          {/* Center typography emblem */}
          <div className="relative z-10 my-auto text-center px-2">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-display text-lg md:text-xl font-bold text-[#FFF1D0] tracking-wide leading-tight line-clamp-2">
              {primaryTitle}
            </h4>
            {secondaryTitle && (
              <p className="text-xs text-amber-200/70 font-medium tracking-wider uppercase mt-1">
                {secondaryTitle}
              </p>
            )}
          </div>

          {/* Bottom subtle banner */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-400">
            <span>Khalifa Balochi Sajji</span>
            <span className="text-amber-400/90 font-mono">Lahore Special</span>
          </div>
        </div>
      )}

      {/* Floating tag if loaded with image */}
      {showRealImage && tag && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase text-amber-300 bg-[#0e0f13]/85 backdrop-blur-md border border-amber-500/40 rounded shadow-md">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            {tag}
          </span>
        </div>
      )}
    </div>
  );
};
