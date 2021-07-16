import { nameReducers, emailIdReducer } from './formReducer'
//The below part is action send email

export const emailsender = (show) => {
    return {
        type: "EMAIL",
        payload: show
    }
}

//The below part is action name display

export const nameDisplay = (show) => {
    return {
        type: "SHOW",
        payload: show
    }
}