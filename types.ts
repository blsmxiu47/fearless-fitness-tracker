export interface Workout {
    id: string;
    exercises: string[];
    datetime: Date;
    title?: string;
    notes?: string;
    duration?: number;
    distance?: number;
    calories?: number;
    averageHeartRate?: number;
    maxHeartRate?: number;
    averageRunCadence?: number;
    maxRunCadence?: number;
    averagePace?: number;
    bestPace?: number;
    averageLapTime?: number;
    bestLapTime?: number;
    numberOfLaps?: number;
    totalAscent?: number;
    totalDescent?: number;
    averageStrideLength?: number;
    minElevation?: number;
    maxElevation?: number;
  }
  