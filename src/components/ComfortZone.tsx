import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Heart, Sparkles, Lock, Unlock } from 'lucide-react';

interface ComfortZoneProps {
  onBack: () => void;
}

export function ComfortZone({ onBack }: ComfortZoneProps) {
  const [activeSection, setActiveSection] = useState<'menu' | 'hug' | 'breathe' | 'affirmations'>('menu');
  const [hugProgress, setHugProgress] = useState(0);
  const [isHugging, setIsHugging] = useState(false);
  const [revealedAffirmations, setRevealedAffirmations] = useState<number[]>([]);
  const [affirmationPrompt, setAffirmationPrompt] = useState('');
  const hugTimerRef = useRef<number | null>(null);

  const affirmations = [
    "You are loved beyond measure",
    "Your presence makes my world brighter",
    "I'm so proud of you, keep pushing! I gotchu!",
    "You're stronger than you know",
    "There is a lot of people looking up to you. Keep being the role model that you are!",
    "You make me want to be better",
    "Your smile is my favorite thing",
    "I believe in you baby. ",
    "You're exactly who you're meant to be",
    "Always here for you",
    "I'm always thinking of you",
    "Thank you for being you"
  ];

  const handleHugStart = () => {
    setIsHugging(true);
    const startTime = Date.now();
    
    hugTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 3000) * 100, 100);
      setHugProgress(progress);
      
      if (progress >= 100) {
        if (hugTimerRef.current) {
          clearInterval(hugTimerRef.current);
        }
      }
    }, 50);
  };

  const handleHugEnd = () => {
    setIsHugging(false);
    if (hugTimerRef.current) {
      clearInterval(hugTimerRef.current);
    }
    setTimeout(() => setHugProgress(0), 300);
  };

  const toggleAffirmation = (index: number) => {
    if (revealedAffirmations.length > 0 && !revealedAffirmations.includes(index)) {
      setAffirmationPrompt('Yibekashal! Enough for today, come back later for more affirmations.');
      return;
    }
    if (revealedAffirmations.includes(index)) {
      setRevealedAffirmations(revealedAffirmations.filter(i => i !== index));
    } else {
      setRevealedAffirmations([index]);
    }
  };

  useEffect(() => {
    return () => {
      if (hugTimerRef.current) {
        clearInterval(hugTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="size-full relative overflow-auto bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100">
      <div className="px-6 py-6">
        <button
          onClick={() => activeSection === 'menu' ? onBack() : setActiveSection('menu')}
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{activeSection === 'menu' ? 'Back to Home' : 'Back to Menu'}</span>
        </button>

        {activeSection === 'menu' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl mb-4 text-gray-800">
                Your Comfort Zone
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                When you need me, I'm here
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Hug Button */}
              <button
                onClick={() => setActiveSection('hug')}
                className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-xl group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  🤗
                </div>
                <h3 className="text-2xl mb-2">Hold for a Hug</h3>
                <p className="text-white/90 text-sm">
                  Ney tega bey! Press and hold to receive my hug
                </p>
              </button>

              {/* Breathe Together */}
              <button
                onClick={() => setActiveSection('breathe')}
                className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-xl group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  🫁
                </div>
                <h3 className="text-2xl mb-2">Breathe With Me</h3>
                <p className="text-white/90 text-sm">
                  Uffeeyyy yiwta - lets take a deep breath
                </p>
              </button>

              {/* Hidden Affirmations */}
              <button
                onClick={() => setActiveSection('affirmations')}
                className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white hover:scale-105 transition-transform shadow-xl group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  💝
                </div>
                <h3 className="text-2xl mb-2">Hidden Messages</h3>
                <p className="text-white/90 text-sm">
                  You know youre amazing but the days you need a lil boost, click to reveal affirmations
                </p>
              </button>
            </div>
          </div>
        )}

        {activeSection === 'hug' && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl mb-6 text-gray-800">
              Hold the Button for a Hug
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-12">
              Press and hold until it's complete
            </p>

            <div className="relative">
              <button
                onMouseDown={handleHugStart}
                onMouseUp={handleHugEnd}
                onMouseLeave={handleHugEnd}
                onTouchStart={handleHugStart}
                onTouchEnd={handleHugEnd}
                className={`
                  relative w-64 h-64 mx-auto rounded-full 
                  bg-gradient-to-br from-pink-400 to-rose-500 
                  shadow-2xl transition-all duration-300 select-none
                  ${isHugging ? 'scale-95' : 'scale-100 hover:scale-105'}
                `}
              >
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeOpacity="0.3"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 115}`}
                    strokeDashoffset={`${2 * Math.PI * 115 * (1 - hugProgress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                  />
                </svg>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-7xl mb-4 transition-transform ${isHugging ? 'scale-90' : 'scale-100'}`}>
                    {hugProgress >= 100 ? '💕' : '🤗'}
                  </div>
                  <div className="text-white text-lg">
                    {hugProgress >= 100 ? 'Hugging you!' : isHugging ? 'Hold on...' : 'Hold me'}
                  </div>
                </div>
              </button>

              {hugProgress >= 100 && (
                <div className="mt-8 animate-in fade-in duration-500">
                  <p className="text-2xl text-gray-700 italic">
                    "Bekash dont kill me ❤️"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'breathe' && (
          <BreathingCircle />
        )}

        {activeSection === 'affirmations' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl mb-4 text-gray-800">
                Hidden Messages Just for You
              </h2>
              <p className="text-gray-600">
                Click each card to reveal my words
              </p>
            </div>

            {affirmationPrompt && (
              <div className="mb-6 text-center">
                <p className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm text-gray-700 shadow">
                  {affirmationPrompt}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {affirmations.map((affirmation, index) => (
                <button
                  key={index}
                  onClick={() => toggleAffirmation(index)}
                  className={`
                    relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105
                    ${revealedAffirmations.includes(index)
                      ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-xl'
                      : 'bg-white/50 backdrop-blur-sm text-gray-400 border-2 border-dashed border-gray-300'
                    }
                  `}
                >
                  {revealedAffirmations.includes(index) ? (
                    <div className="animate-in fade-in duration-500">
                      <Unlock className="w-6 h-6 mx-auto mb-3" />
                      <p className="text-sm leading-relaxed">
                        {affirmation}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Lock className="w-6 h-6 mx-auto mb-3" />
                      <p className="text-sm">
                        Click to reveal
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setRevealedAffirmations([])}
                className="text-gray-600 hover:text-pink-600 transition-colors underline"
              >
                Hide all messages
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BreathingCircle() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          // Move to next phase
          setPhase(current => {
            if (current === 'inhale') return 'hold';
            if (current === 'hold') return 'exhale';
            return 'inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const getPhaseConfig = () => {
    switch (phase) {
      case 'inhale':
        return { scale: 'scale-150', text: 'Breathe In', color: 'from-blue-400 to-cyan-500' };
      case 'hold':
        return { scale: 'scale-150', text: 'Hold', color: 'from-purple-400 to-pink-500' };
      case 'exhale':
        return { scale: 'scale-100', text: 'Breathe Out', color: 'from-pink-400 to-rose-500' };
      default:
        return { scale: 'scale-150', text: 'Breathe In', color: 'from-blue-400 to-cyan-500' };
    }
  };

  const config = getPhaseConfig();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl mb-6 text-gray-800">
        Let's Breathe Together
      </h2>
      <p className="text-gray-600 mb-12">
        Follow the circle and breathe with me
      </p>

      <div className="relative flex items-center justify-center h-[320px] sm:h-[400px]">
        <div
          className={`
            w-32 h-32 rounded-full bg-gradient-to-br ${config.color}
            shadow-2xl transition-all duration-[4000ms] ease-in-out
            ${config.scale}
          `}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-6xl mb-4">{count}</div>
          <div className="text-2xl text-gray-700">{config.text}</div>
        </div>
      </div>

      <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6">
        <p className="text-gray-700 italic">
          Take a deep breath baby. I gotchu.
        </p>
      </div>
    </div>
  );
}
