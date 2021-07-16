import { courseSelector, difficultySetting, courseNum } from "./courseActions"
//The below part is reducer for selecting course

const initialState = 1

export const courseNameReducer = (state = initialState, action) => {
    switch (action.type) {

        case "COURSE":
            return action.payload

        default:
            return state
    }
}

//The below part is reducer for selecting course difficulty

const initialDifficultyState = 1

export const difficultyReducer = (state = initialDifficultyState, action) => {
    switch (action.type) {

        case "DIFFICULTY":
            return action.payload

        default:
            return state
    }
}

//The below part is reducer show courses

const initialCourseNumState = 1

export const courseIdReducer = (state = initialCourseNumState, action) => {
    switch (action.type) {

        case "NUM":
            return action.payload

        default:
            return state
    }
}