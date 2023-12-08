import { CustomEvent } from '../../lib/types'

export default function CustomEventComponent({ event }: { event: CustomEvent }) {
  const workout = event.workout;
  const workoutDetails = `
    Title: ${workout.title || 'Untitled'}
    Date: ${workout.datetime}
    Distance: ${workout.distance || ''}
    Duration: ${workout.duration || ''}
    Notes: ${workout.notes || ''}
  `;
    return (
        <div>
        <strong>{event.title}</strong>
        <div>{workoutDetails}</div>
        </div>
    );
}