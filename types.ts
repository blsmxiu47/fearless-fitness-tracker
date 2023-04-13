export interface Workout {
    id: string;
    exercises: string[];
    datetime: Date;
    userId: string;
    title?: string | null;
    notes?: string | null;
    duration?: number | null;
    distance?: number | null;
    calories?: number | null;
    averageHeartRate?: number | null;
    maxHeartRate?: number | null;
    averageRunCadence?: number | null;
    maxRunCadence?: number | null;
    averagePace?: number | null;
    bestPace?: number | null;
    averageLapTime?: number | null;
    bestLapTime?: number | null;
    numberOfLaps?: number | null;
    totalAscent?: number | null;
    totalDescent?: number | null;
    averageStrideLength?: number | null;
    minElevation?: number | null;
    maxElevation?: number | null;
  }
  