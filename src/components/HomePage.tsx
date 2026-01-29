import React from 'react';
import { Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: 'home' | 'checkin' | 'timeline' | 'comfort') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const homeBackground = new URL('../assets/home-bg.png', import.meta.url).href;

  const locations = [
    {
      id: 'checkin',
      name: 'Daily Check-In',
      description: 'lil checkin for the princess',
      icon: Heart,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'timeline',
      name: 'Our Timeline',
      description: 'Lets go down the memory lane, shall we?',
      icon: Calendar,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'comfort',
      name: 'Comfort Zone',
      description: "I'm always here",
      icon: Sparkles,
      color: 'from-blue-400 to-purple-500'
    }
  ];

  return (
    <div className="size-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={homeBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated Road Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path
          d="M 100 400 Q 300 300 500 350 T 900 300 Q 1100 280 1300 400"
          stroke="rgba(219, 39, 119, 0.3)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10 5"
        />
      </svg>

      {/* Header */}
      <div className="relative z-10 text-center pt-10 sm:pt-12 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Yuhhhhhh its Rewina's World
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto mb-2">
          Explore the world, and lets have some fun
        </p>
        <p className="text-sm text-white/80 italic">
          Choose a destination to visit
        </p>
      </div>

      {/* Location Markers */}
      <div className="relative z-10 mt-8 sm:mt-12 px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {locations.map((location) => {
          const Icon = location.icon;
          return (
            <button
              key={location.id}
              onClick={() => onNavigate(location.id as any)}
              className="group cursor-pointer relative flex flex-col items-center"
            >
              {/* Pulsing Ring */}
              <div className="absolute inset-0 -m-4 bg-pink-300 rounded-full animate-ping opacity-30 -z-10 pointer-events-none" />
              
              {/* Map Pin Container */}
              <div className="relative z-10">
                {/* Pin Point */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${location.color} shadow-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Info Card on Hover */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-pink-200">
                    <MapPin className="w-4 h-4 text-pink-500 mb-2 mx-auto" />
                    <h3 className="font-semibold text-gray-800 text-center mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {location.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      {/* Footer Message */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/80 text-sm italic">
          "I gotchu always innit?"
        </p>
      </div>
    </div>
  );
}
