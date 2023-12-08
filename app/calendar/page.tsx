import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Workout, CustomEvent } from '../../lib/types';
// import CustomEventComponent from '../components/calendar/CustomEventComponent';

import 'react-big-calendar/lib/css/react-big-calendar.css';


const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState<Date>(new Date());
  const { user } = useUser();

  useEffect(() => {
    async function fetchWorkouts(userId: string) {
      // Fetch workouts from the API
      const res = await fetch(`/api/workouts?userId=${userId}`);
      const workouts = await res.json();

      // Convert workouts to CustomEvent objects
      const formattedEvents = workouts.map((workout: Workout) => ({
        title: workout.title || 'Untitled',
        workout,
        start: new Date(workout.datetime),
        end: new Date(workout.datetime),
        allDay: true,
      }));
  
      setEvents(formattedEvents => ({
        ...formattedEvents
      }));
    }
  
    fetchWorkouts(user!.sub as string);
  }, []);

  const localizer = momentLocalizer(moment);

  const onEventClick = (event: CustomEvent) => {
    const workout = event.workout;
    const workoutDetails = `
      Title: ${workout.title || 'Untitled'}
      Date: ${workout.datetime}
      Distance: ${workout.distance || ''}
      Duration: ${workout.duration || ''}
      Notes: ${workout.notes || ''}
    `;

    // TODO: Display workout details in an overlay/modal
    alert(workoutDetails);
  };

  const onSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const selectedDate = slotInfo.start.toLocaleDateString();
    const selectedTime = slotInfo.start.toLocaleTimeString();
  
    // TODO: open modal or form to add a new event
    alert(`Selected date: ${selectedDate}\nSelected time: ${selectedTime}`);
  };
  

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', 'week']} // TODO: Add custom 'year' view
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        selectable
        onSelectEvent={onEventClick}
        onSelectSlot={onSelectSlot}
        // components={{
        //   event: CustomEventComponent, // TODO: Define a custom event component
        // }}
        formats={{
          dateFormat: 'D', // Customize the date format if needed
          dayFormat: 'ddd D/MM', // Customize the day format if needed
        }}
        style={{ height: '80vh' }}
      />
      {/* Add left and right arrows, view mode buttons, and workout details overlay/modal */}
    </div>
  );  
};

export default CalendarPage;
