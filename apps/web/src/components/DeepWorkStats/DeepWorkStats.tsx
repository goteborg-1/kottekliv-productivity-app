import "./DeepWorkStats.css"

interface DeepWorkStatsProps {
  today: string;
  week: string;
}

function DeepWorkStats({ today, week }: DeepWorkStatsProps) {
  return (
    <div className="deepwork-stats">
      <div className="stat-item">
        <p className="stat-value">{today}</p>
        <p className="stat-label">Today</p>
      </div>
      <div className="stat-item">
        <p className="stat-value">{week}</p>
        <p className="stat-label">This Week</p>
      </div>
    </div>
  )
}

export default DeepWorkStats
