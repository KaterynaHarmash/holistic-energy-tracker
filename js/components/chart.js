// Групує логи по днях та обчислює середнє значення енергії для кожного дня
export function groupEnergyLogsByDay(logs) {
  const grouped = logs.reduce((acc, log) => {
    const date = log.timestamp.slice(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, logs]) => {
    const avgEnergy = logs.reduce((sum, log) => sum + log.energyLvl, 0) / logs.length;
    return {
      date,
      avgEnergy: Number(avgEnergy.toFixed(2)),
      entries: logs.length
    };
  });
}

// Створює графік з даних
export function renderChart(records) {
  const logsByDate = groupEnergyLogsByDay(records);
  const chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: logsByDate.map(log => log.date),
      datasets: [{
        label: 'Energy level by days',
        data: logsByDate.map(log => log.avgEnergy),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: {
            display: true,
            text: 'Energy Level'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    }
  });

  return chart;
}

// Оновлює існуючий графік новими даними
export function updateChart(chartInstance, records) {
  const logsByDate = groupEnergyLogsByDay(records);

  chartInstance.data.labels = logsByDate.map(log => log.date);
  chartInstance.data.datasets[0].data = logsByDate.map(log => log.avgEnergy);
  chartInstance.update();
}