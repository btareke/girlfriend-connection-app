import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { DailyCheckIn } from './components/DailyCheckIn';
import { Timeline } from './components/Timeline';
import { ComfortZone } from './components/ComfortZone';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'checkin' | 'timeline' | 'comfort'>('home');

  return (
    <div className="size-full bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'checkin' && <DailyCheckIn onBack={() => setCurrentPage('home')} />}
      {currentPage === 'timeline' && <Timeline onBack={() => setCurrentPage('home')} />}
      {currentPage === 'comfort' && <ComfortZone onBack={() => setCurrentPage('home')} />}
    </div>
  );
}
