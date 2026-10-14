import { CapabilityCard } from './CapabilityCard.js';
import { useApiData } from '../hooks/useApiData.js';
import { getJson } from '../api/client.js';

type Workout = { title: string; focus: string; minutes: number; difficulty: string; reason: string };

export default function Workouts() {
  const email = encodeURIComponent('mona@example.com');
  const { data, error, loading } = useApiData(`/api/workouts/suggestions/${email}`, getJson<{ suggestions: Workout[] }>);

  return <CapabilityCard title="Workout suggestions" description="Recommend workouts from activity patterns.">
    {loading ? <p role="status">Loading workout suggestions...</p> : error ? <p role="alert">Unable to load workout suggestions: {error}</p> : !data?.suggestions?.length ? <p>No workout suggestions yet.</p> : <ul className="list-group list-group-flush">
      {data.suggestions.map((workout) => <li className="list-group-item px-0" key={workout.title}>
        <strong>{workout.title}</strong><span className="ms-2 text-capitalize">{workout.focus}</span>
        <div>{workout.minutes} minutes, {workout.difficulty}</div><p className="mb-0 text-body-secondary">{workout.reason}</p>
      </li>)}
    </ul>}
  </CapabilityCard>;
}
