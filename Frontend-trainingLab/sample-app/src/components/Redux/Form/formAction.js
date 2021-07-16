import { nameReducers, emailIdReducer } from './formReducer'


export const emailsender = (show) => {
    return {
        type: "EMAIL",
        payload: show
    }
}


export const nameDisplay = (show) => {
    return {
        type: "SHOW",
        payload: show
    }
}