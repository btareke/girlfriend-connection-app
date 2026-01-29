import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLeft, Heart, Frown, Meh, Smile, Sparkles, CloudRain, Sun } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DailyCheckInProps {
  onBack: () => void;
}

type Mood = 'happy' | 'sad' | 'anxious' | 'tired' | 'excited' | 'mad' | 'grateful' | 'stressed';

interface MoodOption {
  id: Mood;
  emoji: string;
  label: string;
  icon: any;
  color: string;
}

interface Message {
  type: 'video' | 'letter';
  content: string;
  title: string;
}

export function DailyCheckIn({ onBack }: DailyCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const moods: MoodOption[] = [
    { id: 'happy', emoji: '😊', label: 'Happy', icon: Smile, color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' },
    { id: 'sad', emoji: '😢', label: 'Sad', icon: Frown, color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', icon: CloudRain, color: 'bg-purple-100 border-purple-300 hover:bg-purple-200' },
    { id: 'tired', emoji: '😴', label: 'Tired', icon: Meh, color: 'bg-gray-100 border-gray-300 hover:bg-gray-200' },
    { id: 'excited', emoji: '🤩', label: 'Excited', icon: Sparkles, color: 'bg-pink-100 border-pink-300 hover:bg-pink-200' },
    { id: 'mad', emoji: '😡', label: 'Mad', icon: Heart, color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200' },
    { id: 'grateful', emoji: '🥰', label: 'Grateful', icon: Sun, color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
    { id: 'stressed', emoji: '😤', label: 'Stressed', icon: CloudRain, color: 'bg-red-100 border-red-300 hover:bg-red-200' },
  ];

  const messages: Record<Mood, Message> = {
    happy: {
      type: 'video',
      title: "I'm So Happy You're Happy!",
      content: 'https://www.youtube.com/embed/89hrHMPf4wg?autoplay=1&mute=0&playsinline=1'
    },
    sad: {
      type: 'video',
      title: "It's Okay to Feel Sad",
      content: 'https://www.youtube.com/embed/-AUGOcnrclg?autoplay=1&mute=0&playsinline=1'
    },
    anxious: {
      type: 'video',
      title: "Take a Deep Breath",
      content: 'https://www.youtube.com/embed/4kKniI9u2xM?autoplay=1&mute=0&playsinline=1'
    },
    tired: {
      type: 'video',
      title: "Rest, My Love",
      content: 'https://www.youtube.com/embed/h51YI7PXR0E?autoplay=1&mute=0&playsinline=1'
    },
    excited: {
      type: 'video',
      title: "Your Energy is Contagious!",
      content: 'https://www.youtube.com/embed/89hrHMPf4wg?autoplay=1&mute=0&playsinline=1'
    },
    mad: {
      type: 'video',
      title: "It's Okay to Feel Mad",
      content: 'https://www.youtube.com/embed/ixURyjpa5l8?autoplay=1&mute=0&playsinline=1'
    },
    grateful: {
      type: 'video',
      title: "You Make Me Grateful Too",
      content: 'https://www.youtube.com/embed/89hrHMPf4wg?autoplay=1&mute=0&playsinline=1'
    },
    stressed: {
      type: 'video',
      title: "We'll Get Through This",
      content: 'https://www.youtube.com/embed/h51YI7PXR0E?autoplay=1&mute=0&playsinline=1'
    },
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setShowForm(true);
    setShowMessage(false);
    setMessageText('');
  };

  const handleReset = () => {
    setSelectedMood(null);
    setShowForm(false);
    setShowMessage(false);
    setMessageText('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMood) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const category = moods.find((mood) => mood.id === selectedMood)?.label ?? '';

    emailjs
      .send(
        'service_5666fpl',
        'template_r9rpjsu',
        {
          category,
          message: messageText,
          mood: selectedMood
        },
        'nx5eFQ9JGdUH-3Hmb'
      )
      .then(() => {
        setShowForm(false);
        setShowMessage(true);
      })
      .catch(() => {
        setSubmitError('Something went wrong. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="size-full relative overflow-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100" />

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {!showMessage ? (
          <div className="max-w-4xl mx-auto">
            {!showForm ? (
              <>
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-800">
                    How we feeling konjo?
                  </h1>
              <p className="text-base sm:text-lg text-gray-600">
                    Pick what resonates with you right now
                  </p>
                </div>

                {/* Mood Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {moods.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.id)}
                        className={`${mood.color} border-2 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                      >
                        <div className="text-5xl mb-3">{mood.emoji}</div>
                        <div className="flex items-center justify-center gap-2">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-800">{mood.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              selectedMood && (
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
                  <h2 className="text-2xl sm:text-3xl text-gray-800 mb-2 text-center">
                    Tell me what's on your mind
                  </h2>
                  <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    This stays between us ❤️
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={moods.find((mood) => mood.id === selectedMood)?.label ?? ''}
                        readOnly
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Change the feeling by going back.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        rows={5}
                        placeholder="Dump your thoughts here..."
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 focus:border-pink-300 focus:outline-none"
                        required
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-600 text-center">
                        {submitError}
                      </p>
                    )}

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleReset}
              className="mb-6 text-gray-600 hover:text-pink-600 transition-colors"
            >
              ← Choose a different feeling
            </button>

            {selectedMood && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Message Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 text-center">
                  <div className="text-6xl mb-4">
                    {moods.find(m => m.id === selectedMood)?.emoji}
                  </div>
                  <h2 className="text-3xl text-white">
                    {messages[selectedMood].title}
                  </h2>
                </div>

                {/* Message Content */}
                <div className="p-8">
                  {messages[selectedMood].type === 'video' ? (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden">
                      <iframe
                        src={messages[selectedMood].content}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={`${messages[selectedMood].title} video`}
                      />
                    </div>
                  ) : (
                    <div className="bg-amber-50 rounded-xl p-8 border-4 border-amber-200 min-h-[400px] flex items-center justify-center">
                      {/* Handwritten Letter Placeholder */}
                      <div className="text-center">
                        <div className="text-6xl mb-4">💌</div>
                        <p className="text-gray-700 mb-2">Handwritten Letter Placeholder</p>
                        <p className="text-sm text-gray-600 max-w-md">
                          Replace with your handwritten letter PNG:
                        </p>
                        <code className="block bg-white px-4 py-2 rounded mt-2 text-xs">
                          {messages[selectedMood].content}
                        </code>
                        <p className="text-xs text-gray-500 mt-4">
                          Use ImageWithFallback component to display your letter image
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Message */}
                <div className="p-6 bg-pink-50 text-center border-t border-pink-100">
                  <p className="text-gray-700 italic">
                    "I'm always here for you, no matter how you're feeling ❤️"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
