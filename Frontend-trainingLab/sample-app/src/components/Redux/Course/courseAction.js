import { courseNameReducer, difficultyReducer, courseIdReducer } from "./courseReducer"


export const courseSelector = (show) => {
    return {
        type: "COURSE",
        payload: show
    }
}


export const difficultySetting = (show) => {
    return {
        type: "DIFFICULTY",
        payload: show
    }
}


export const courseNum = (show) => {
    return {
        type: "NUM",
        payload: show
    }
}