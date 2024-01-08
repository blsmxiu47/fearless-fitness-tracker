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
    reps: number
    duration: string
    weight: string
    rest: string
    notes: string
    focus: Focus

}