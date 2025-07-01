import React, { useState, useEffect } from 'react';
import JournalEntry from './components/JournalEntry';
import MoodTracker from './components/MoodTracker';
import Analytics from './components/Analytics';
import Reminder from './components/Reminder';

function App() {
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('entries')) || []);
  const [moods, setMoods] = useState(() => JSON.parse(localStorage.getItem('moods')) || []);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
    localStorage.setItem('moods', JSON.stringify(moods));
  }, [entries, moods]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Daily Journal</h1>
      <div className="grid gap-6 max-w-3xl mx-auto">
        <JournalEntry entries={entries} setEntries={setEntries} />
        <MoodTracker moods={moods} setMoods={setMoods} />
        <Analytics moods={moods} />
        <Reminder />
      </div>
    </div>
  );
}

export default App;
