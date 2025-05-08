


export function groupEnergyLogsByDay(logs) {
    const uniqueDates = [...new Set(logs.map(log => log.timestamp.slice(0, 10)))];
  
    return uniqueDates.map(date => {
      const logsForDate = logs.filter(log => log.timestamp.startsWith(date));
      const avgEnergy =
        logsForDate.reduce((sum, log) => sum + log.energyLvl, 0) / logsForDate.length;
  
      return {
        date, // формат YYYY-MM-DD
        avgEnergy: Number(avgEnergy.toFixed(2)),
        entries: logsForDate.length
      };
    });
  }

export function renderChart(records){
  const logsByDate = groupEnergyLogsByDay(records);
  const chart = new Chart(
    document.getElementById('chart'),
    {
      type: 'line',
      responsive: 'true',
      data: { 
        labels: logsByDate.map(log => log.date),
        datasets: [
          {
              label: 'Energy level by days',
              data: logsByDate.map(log => log.avgEnergy)
          }
        ]
      }
    })
  return chart;
}