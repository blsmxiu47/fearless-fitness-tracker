export type ExerciseTmp = {
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

export type Exercise = {
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

export type Focus = {
    id: number
    user_id: number
    name: string
}

export type Plan = {
    id: number
    user_id: number
    name: string
    description: string
    duration: string
    frequency: string
    tags: string[]
    plan_days: PlanDay[]
    users: User
}

export type PlanDay = {
    id: number
    user_id: number
    plan_id: number
    week_number: number
    day_number: number
    description: string
    session_a: string
    session_b: string
    total_duration: string
    total_distance: string
    plan: Plan
}

export type Routine = {
    id: number
    user_id: number
    name: string
    duration: string
    frequency: string
    type: Type
    exercises: Exercise[]
}

export type Run = {
    id: number
    user_id: number
    datetime: string
    title: string
    cycle_id: number
    week_number: number
    week_label: string
    shoe_id: number
    hydropak: boolean
    notes: string
    duration: number
    distance: number
    distance_unit: string
    elevation_gain: number
    elevation_gain_unit: string
    ti_1: number
    ti_2: number
    ti_3: number
    ti_4: number
    ti_5: number
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
    shoes: Shoe
    users: User
}

export type Shoe = {
    id: number
    user_id: number
    model: string
    class: string
    description: string
    rating: number
    notes: string
    runs: Run[]
    users: User
}

export type Type = {
    id: number
    user_id: number
    name: string
}

export type User = {
    id: number
    email: string
    first_name: string
    exercises: Exercise[]
    focuses: Focus[]
    plans: Plan[]
    routines: Routine[]
    runs: Run[]
    shoes: Shoe[]
    types: Type[]
    workouts: Workout[]
}
 
export type WorkoutExercise = {
    workout_id: number
    exercise_id: number
    exercises: Exercise
    workouts: Workout
}

export type Workout = {
    id: number
    user_id: number
    type_id: number
    workout_exercises: WorkoutExercise[]
    datetime: string
    title: string
    notes: string
    duration: number
    type: Type
    user: User
}