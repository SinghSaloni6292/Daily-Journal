import React, { useState } from 'react';

function JournalEntry({ entries, setEntries }) {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    setEntries([...entries, { date: new Date().toLocaleDateString(), text }]);
    setText('');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Journal Entry</h2>
      <textarea className="w-full border p-2 rounded mb-2" rows="4"
        value={text} onChange={(e) => setText(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
        Save Entry
      </button>
    </div>
  );
}

export default JournalEntry;
