export interface Type {
    id: number
    user_id: number
    name: string
}

export interface Focus {
    id: number
    user_id: number
    name: string
}

export interface ExerciseTmp {
    id: number
    user_id: number
    routine_id: number
    ordinal: number
    name: string
    sets: number
    reps: number
    duration: string
    weight: string
    rest: string
    notes: string
    focuses: Focus[]
}
export interface Exercise {
    id: number
    user_id: number
    routine_id: number
    ordinal: number
    name: string
    sets: number
    reps: string
    duration: string
    weight: string
    rest: string
    notes: string
    focus: Focus
}

export interface WorkoutTmp {
    id: number
    user_id: number
    type_id: number
    types: Type[]
    exercises: Exercise[]
    datetime: Date
    title: string
    notes: string
    duration: number
    distance: number
    calories: number
    average_heart_rate: number
    max_heart_rate: number
    average_run_cadence: number
    max_run_cadence: number
    average_pace: number
    best_pace: number
    average_lap_time: number
    best_lap_time: number
    number_of_laps: number
    total_ascent: number
    total_descent: number
    average_stride_length: number
    min_elevation: number
    max_elevation: number
}

export interface Workout {
    id: number
    user_id: number
    type_id: number
    type: Type
    exercises: Exercise[]
    datetime: Date
    title: string
    notes: string
    duration: number
    distance: number
    calories: number
    average_heart_rate: number
    max_heart_rate: number
    average_run_cadence: number
    max_run_cadence: number
    average_pace: number
    best_pace: number
    average_lap_time: number
    best_lap_time: number
    number_of_laps: number
    total_ascent: number
    total_descent: number
    average_stride_length: number
    min_elevation: number
    max_elevation: number
}