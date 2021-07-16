import { courseNameReducer, difficultyReducer, courseIdReducer } from "./courseReducers"
//The below part is action for selecting course

export const courseSelector = (show) => {
    return {
        type: "COURSE",
        payload: show
    }
}
//The below part is action for selecting course difficulty

export const difficultySetting = (show) => {
    return {
        type: "DIFFICULTY",
        payload: show
    }
}

//The below part is action show courses

export const courseNum = (show) => {
    return {
        type: "NUM",
        payload: show
    }
}