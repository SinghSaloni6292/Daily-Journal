import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Analytics({ moods }) {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const moodCounts = moods.reduce((acc, m) => {
      acc[m.mood] = (acc[m.mood] || 0) + 1;
      return acc;
    }, {});

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
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
  }, [moods]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Analytics</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Analytics;
