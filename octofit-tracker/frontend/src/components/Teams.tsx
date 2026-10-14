import { CapabilityCard } from './CapabilityCard.js';
import { useApiData } from '../hooks/useApiData.js';
import { getJson } from '../api/client.js';

type Team = { name: string; mascot?: string; members?: unknown[] };

export default function Teams() {
  const { data, error, loading } = useApiData('/api/teams', getJson<{ teams: Team[] }>);

  return <CapabilityCard title="Teams" description="Manage teams and members.">
    {loading ? <p role="status">Loading teams...</p> : error ? <p role="alert">Unable to load teams: {error}</p> : !data?.teams?.length ? <p>No teams yet.</p> : <ul className="list-group list-group-flush">
      {data.teams.map((team) => <li className="list-group-item px-0" key={team.name}>
        <strong>{team.name}</strong>{team.mascot ? `, mascot ${team.mascot}` : ''} <span className="text-body-secondary">({team.members?.length ?? 0} members)</span>
      </li>)}
    </ul>}
  </CapabilityCard>;
}
