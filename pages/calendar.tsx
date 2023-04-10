import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Workout } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchWorkoutsFromDatabase(userId: string): Promise<Workout[]> {
  try {
    const workouts = await prisma.workout.findMany({}); // TODO: Fetch workouts from the database
    return workouts;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}



interface CustomEvent extends Event {
  title: string;
  distance?: number;
  duration?: number;
  workout: Workout;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchWorkouts() {
      // Fetch workouts using Prisma
      // TODO: Implement this function to fetch workouts using Prisma
      const workouts = await fetchWorkoutsFromDatabase(); 
  
      // Convert workouts to CustomEvent objects
      const formattedEvents = workouts.map((workout) => ({
        ...workout,
        title: workout.title || 'Untitled',
        start: new Date(workout.datetime),
        end: new Date(workout.datetime),
        allDay: true,
        workout,
      }));
  
      setEvents(formattedEvents);
    }
  
    fetchWorkouts();
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
        views={['month', 'week', 'year']} // TODO: Add custom 'year' view
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        selectable
        onSelectEvent={onEventClick}
        onSelectSlot={onSelectSlot}
        components={{
          event: CustomEventComponent, // TODO: Define a custom event component
        }}
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
