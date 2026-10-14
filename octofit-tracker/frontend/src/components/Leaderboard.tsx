import { CapabilityCard } from './CapabilityCard.js';
import { useApiData } from '../hooks/useApiData.js';
import { getJson } from '../api/client.js';

type LeaderboardEntry = { teamName: string; totalPoints: number; rank: number };

export default function Leaderboard() {
  const { data, error, loading } = useApiData('/api/leaderboard', getJson<{ leaderboard: LeaderboardEntry[] }>);

  return <CapabilityCard title="Leaderboard" description="Compare team point totals.">
    {loading ? <p role="status">Loading leaderboard...</p> : error ? <p role="alert">Unable to load leaderboard: {error}</p> : !data?.leaderboard?.length ? <p>No leaderboard scores yet.</p> : <ol className="list-group list-group-numbered">
      {data.leaderboard.map((entry) => <li className="list-group-item" key={entry.teamName}>
        <span className="fw-semibold">{entry.teamName}</span><span className="ms-2">{entry.totalPoints} points</span>
      </li>)}
    </ol>}
  </CapabilityCard>;
}
