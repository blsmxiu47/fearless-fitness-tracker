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
    name: string
    types: Type[]
    focuses: Focus[]
}
export interface Exercise {
    id: number
    user_id: number
    name: string
    type: Type
    focus: Focus
}