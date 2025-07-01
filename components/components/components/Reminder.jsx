import React, { useState, useEffect } from 'react';

function Reminder() {
  const [time, setTime] = useState(localStorage.getItem('reminderTime') || '');

  const handleSetReminder = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    localStorage.setItem('reminderTime', time);
    alert('Reminder set for ' + time);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const [h, m] = (localStorage.getItem('reminderTime') || '').split(':');
      const now = new Date();
      if (now.getHours() === parseInt(h) && now.getMinutes() === parseInt(m)) {
        if (Notification.permission === 'granted') {
          new Notification('Time to write in your journal!');
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Reminder</h2>
      <input type="time" className="w-full border p-2 rounded mb-2"
        value={time} onChange={(e) => setTime(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSetReminder}>
        Set Reminder
      </button>
    </div>
  );
}

export default Reminder;
