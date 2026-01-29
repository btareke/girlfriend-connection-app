import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TimelineProps {
  onBack: () => void;
}

interface MonthData {
  name: string;
  season: string;
  description: string;
  media: string;
  mediaType: 'image' | 'video' | 'youtube';
  hasAudio?: boolean;
}

export function Timeline({ onBack }: TimelineProps) {
  const [hoveredMonth, setHoveredMonth] = useState<{ yearIndex: number; monthIndex: number } | null>(null);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicBlocked, setMusicBlocked] = useState(false);

  const baseMonths: MonthData[] = [
    { name: 'January', season: '', media: 'https://images.unsplash.com/photo-1542609715982-16f4e1e2cfc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93fGVufDF8fHx8MTc2ODQ3MjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Starting the year together' },
    { name: 'February', season: '', media: 'https://images.unsplash.com/photo-1542609715982-16f4e1e2cfc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93fGVufDF8fHx8MTc2ODQ3MjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Love month - Appriciating you ❤️' },
    { name: 'March', season: '', media: 'https://images.unsplash.com/photo-1559150182-a7144f7628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2ODQwMzM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Mummzy knows??' },
    { name: 'April', season: '', media: 'https://images.unsplash.com/photo-1559150182-a7144f7628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2ODQwMzM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'This is evidence of how much you love me' },
    { name: 'May', season: '', media: 'https://images.unsplash.com/photo-1559150182-a7144f7628f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2ODQwMzM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Hair looking amazing' },
    { name: 'June', season: '', media: 'https://images.unsplash.com/photo-1620127682229-33388276e540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBiZWFjaHxlbnwxfHx8fDE3Njg0MjQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Always Copying me' },
    { name: 'July', season: '', media: 'https://images.unsplash.com/photo-1620127682229-33388276e540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBiZWFjaHxlbnwxfHx8fDE3Njg0MjQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Message for our kids' },
    { name: 'August', season: '', media: 'https://images.unsplash.com/photo-1620127682229-33388276e540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBiZWFjaHxlbnwxfHx8fDE3Njg0MjQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Sending you kisses' },
    { name: 'September', season: '', media: 'https://images.unsplash.com/photo-1535608577102-bb54e62fe045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBsZWF2ZXN8ZW58MXx8fHwxNzY4NDE3MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Ete mete yelomi ..... finish it' },
    { name: 'October', season: '', media: 'https://images.unsplash.com/photo-1535608577102-bb54e62fe045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBsZWF2ZXN8ZW58MXx8fHwxNzY4NDE3MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Dear future kids, You have an amazing mother' },
    { name: 'November', season: '', media: 'https://images.unsplash.com/photo-1535608577102-bb54e62fe045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBsZWF2ZXN8ZW58MXx8fHwxNzY4NDE3MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Grateful for us' },
    { name: 'December', season: '', media: 'https://images.unsplash.com/photo-1542609715982-16f4e1e2cfc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93fGVufDF8fHx8MTc2ODQ3MjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', mediaType: 'image', description: 'Year end magic' }
  ];
  const timeline2025Media: Record<string, { media: string; mediaType: 'image' | 'video' | 'youtube'; hasAudio?: boolean }> = {
    January: { media: '/timeline-2025/January.png', mediaType: 'image' },
    February: { media: '/timeline-2025/February.PNG', mediaType: 'image' },
    March: { media: '/timeline-2025/March.MP4', mediaType: 'video' },
    April: { media: '/timeline-2025/April.MP4', mediaType: 'video' },
    May: { media: '/timeline-2025/May.MP4', mediaType: 'video' },
    June: { media: '/timeline-2025/June.PNG', mediaType: 'image' },
    July: {
      media: 'https://www.youtube.com/embed/hJqjNQURO3A?autoplay=1&mute=0&controls=0&loop=1&playlist=hJqjNQURO3A&playsinline=1',
      mediaType: 'youtube',
      hasAudio: true
    },
    August: { media: '/timeline-2025/August.MP4', mediaType: 'video' },
    September: { media: '/timeline-2025/September.mp4', mediaType: 'video' },
    October: { media: '/timeline-2025/October.MP4', mediaType: 'video' },
    November: { media: '/timeline-2025/November.MP4', mediaType: 'video' },
    December: { media: '/timeline-2025/December.mp4', mediaType: 'video' }
  };

  const buildYearMonths = (year: number) =>
    baseMonths.map((month) => {
      if (year !== 2025) {
        return month;
      }
      const override = timeline2025Media[month.name];
      return override ? { ...month, ...override } : month;
    });

  const years = [
    { year: 2025, months: buildYearMonths(2025) },
    { year: 2026, months: buildYearMonths(2026) }
  ];

  const activeYear = selectedYearIndex !== null ? years[selectedYearIndex] : null;
  const hoveredData =
    hoveredMonth !== null
      ? years[hoveredMonth.yearIndex].months[hoveredMonth.monthIndex]
      : null;

  useEffect(() => {
    if (!hoveredData || hoveredData.mediaType !== 'video') {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = !hoveredData.hasAudio;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, [hoveredData]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.loop = true;
    audio.volume = 0.6;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setMusicBlocked(false))
        .catch(() => setMusicBlocked(true));
    }

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div className="size-full relative overflow-hidden">
      {/* Background Image - Changes based on hovered month */}
      <div className="absolute inset-0 transition-all duration-700">
        {hoveredData ? (
          hoveredData.mediaType === 'video' ? (
            <video
              key={`${hoveredData.media}-${hoveredMonth?.yearIndex}-${hoveredMonth?.monthIndex}`}
              ref={videoRef}
              src={hoveredData.media}
              className="w-full h-full object-cover"
              autoPlay
              loop
              playsInline
              muted={!hoveredData.hasAudio}
            />
          ) : hoveredData.mediaType === 'youtube' ? (
            <iframe
              key={`${hoveredData.media}-${hoveredMonth?.yearIndex}-${hoveredMonth?.monthIndex}`}
              src={hoveredData.media}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`${hoveredData.name} video`}
            />
          ) : (
            <ImageWithFallback
              src={hoveredData.media}
              alt={hoveredData.name}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 size-full overflow-auto">
        <audio ref={audioRef} src="/music/every-kind-of-way.mp3" />
        <div className="px-6 py-6">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-pink-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            {selectedYearIndex !== null && (
              <button
                onClick={() => {
                  setSelectedYearIndex(null);
                  setHoveredMonth(null);
                }}
                className="flex items-center gap-2 text-white/90 hover:text-pink-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Years</span>
              </button>
            )}
            {musicBlocked && (
              <button
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) {
                    return;
                  }
                  audio.play()
                    .then(() => setMusicBlocked(false))
                    .catch(() => {});
                }}
                className="ml-auto px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                Play music
              </button>
            )}
          </div>

          {activeYear ? (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                  {activeYear.year}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90">
                  Hover over each month to explore our journey together
                </p>
              </div>

              {/* Calendar View */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
                {activeYear.months.map((month, monthIndex) => {
                  const isHovered =
                    hoveredMonth?.yearIndex === selectedYearIndex &&
                    hoveredMonth?.monthIndex === monthIndex;

                  return (
                    <div
                      key={`${activeYear.year}-${month.name}`}
                      onMouseEnter={() => setHoveredMonth({ yearIndex: selectedYearIndex ?? 0, monthIndex })}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="group cursor-pointer"
                    >
                      <div className={`
                        relative overflow-hidden rounded-2xl p-6 h-40
                        transition-all duration-500 transform
                        ${isHovered
                          ? 'bg-white scale-110 shadow-2xl'
                          : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 scale-100'
                        }
                      `}>
                        <div className={`
                          text-sm font-medium mb-2 transition-colors
                          ${isHovered ? 'text-pink-600' : 'text-white/60'}
                        `}>
                          {String(monthIndex + 1).padStart(2, '0')}
                        </div>
                        <h3 className={`
                          text-2xl mb-2 transition-colors
                          ${isHovered ? 'text-gray-800' : 'text-white'}
                        `}>
                          {month.name}
                        </h3>
                        <p className={`
                          text-sm transition-colors
                          ${isHovered ? 'text-gray-600' : 'text-white/70'}
                        `}>
                          {month.season}
                        </p>
                        {isHovered && (
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-sm text-pink-600 italic animate-in fade-in duration-300">
                              {month.description}
                            </p>
                          </div>
                        )}
                        {isHovered && (
                          <div className="absolute top-2 right-2">
                            <div className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                              
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                  Our Timeline
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90">
                  Pick a year to open its calendar
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {years.map((year, yearIndex) => {
                  const isComingSoon = year.year === 2026;

                  return (
                    <div key={year.year} className="group text-left">
                      <button
                        onClick={() => {
                          if (isComingSoon) {
                            return;
                          }
                          setSelectedYearIndex(yearIndex);
                          setHoveredMonth(null);
                        }}
                        className={`w-full ${isComingSoon ? 'cursor-not-allowed' : ''}`}
                        disabled={isComingSoon}
                      >
                        <div className={`border border-white/30 rounded-3xl p-8 transition-all duration-300 ${
                          isComingSoon
                            ? 'bg-white/5'
                            : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl'
                        }`}>
                          <div className="flex items-center gap-4 mb-6">
                            <div className="h-10 w-14 rounded-lg bg-pink-200/80" />
                            <h2 className="text-4xl text-white font-semibold">
                              {year.year}
                            </h2>
                          </div>
                          <p className="text-white/80">
                            {isComingSoon
                              ? 'Coming soon...'
                              : `Open the ${year.year} calendar and relive each month together.`}
                          </p>
                        </div>
                      </button>
                      {isComingSoon && (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-black/20">
                          <video
                            src="/videos/bae.mp4"
                            className="w-full h-48 sm:h-56 md:h-64 object-contain"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instructions 
          <div className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white text-lg mb-3">💡 Customization Tips:</h3>
            <ul className="text-white/80 text-sm space-y-2">
              <li>• Replace the <code className="bg-white/20 px-2 py-0.5 rounded">image</code> URLs with your own photos or videos</li>
              <li>• Update <code className="bg-white/20 px-2 py-0.5 rounded">description</code> with your personal memories</li>
              <li>• Add specific dates, events, or inside jokes for each month</li>
              <li>• Consider adding a gallery modal that opens when clicking a month</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
