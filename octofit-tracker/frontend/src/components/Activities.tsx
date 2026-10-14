import { CapabilityCard } from './CapabilityCard.js';
import { useApiData } from '../hooks/useApiData.js';
import { getJson } from '../api/client.js';

type Activity = { type: string; minutes: number; points: number };

export default function Activities() {
  const { data, error, loading } = useApiData('/api/activities', getJson<{ activities: Activity[] }>);

  return <CapabilityCard title="Activities" description="Track student activity minutes and points.">
    {loading ? <p role="status">Loading activities...</p> : error ? <p role="alert">Unable to load activities: {error}</p> : !data?.activities?.length ? <p>No activities yet.</p> : <ul className="list-group list-group-flush">
      {data.activities.map((activity) => <li className="list-group-item px-0" key={`${activity.type}-${activity.minutes}-${activity.points}`}>
        <span className="text-capitalize">{activity.type}</span>: {activity.minutes} minutes, {activity.points} points
      </li>)}
    </ul>}
  </CapabilityCard>;
}
