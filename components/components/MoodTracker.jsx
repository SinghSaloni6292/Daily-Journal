import React, { useState } from 'react';

function MoodTracker({ moods, setMoods }) {
  const [mood, setMood] = useState('Happy');

  const handleTrack = () => {
    setMoods([...moods, { date: new Date().toLocaleDateString(), mood }]);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Mood Tracking</h2>
      <select className="w-full border p-2 rounded mb-2" value={mood} onChange={(e) => setMood(e.target.value)}>
        <option>Happy</option>
        <option>Sad</option>
        <option>Neutral</option>
        <option>Anxious</option>
        <option>Excited</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleTrack}>Track Mood</button>
    </div>
  );
}

export default MoodTracker;
