const entries = JSON.parse(localStorage.getItem('entries') || '[]');
const moods = JSON.parse(localStorage.getItem('moods') || '[]');

function saveEntry() {
  const entry = document.getElementById('entry').value;
  if (entry.trim() !== '') {
    entries.push({ date: new Date().toLocaleDateString(), entry });
    localStorage.setItem('entries', JSON.stringify(entries));
    alert('Entry saved!');
    document.getElementById('entry').value = '';
  }
}

function trackMood() {
  const mood = document.getElementById('mood').value;
  moods.push({ date: new Date().toLocaleDateString(), mood });
  localStorage.setItem('moods', JSON.stringify(moods));
  alert('Mood tracked!');
  updateChart();
}

function updateChart() {
  const moodCounts = moods.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});

  const ctx = document.getElementById('moodChart').getContext('2d');
  if (window.moodChart) window.moodChart.destroy();

  window.moodChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(moodCounts),
      datasets: [{
        label: 'Mood Frequency',
        data: Object.values(moodCounts),
        backgroundColor: '#4a90e2'
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

function setReminder() {
  const time = document.getElementById('reminderTime').value;
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  localStorage.setItem('reminderTime', time);
  alert('Reminder set for ' + time);
}

function checkReminder() {
  const time = localStorage.getItem('reminderTime');
  if (!time) return;
  const [h, m] = time.split(':').map(Number);
  const now = new Date();
  if (now.getHours() === h && now.getMinutes() === m) {
    if (Notification.permission === 'granted') {
      new Notification('Time to write in your journal!');
    }
  }
}

setInterval(checkReminder, 60000); 
updateChart();
