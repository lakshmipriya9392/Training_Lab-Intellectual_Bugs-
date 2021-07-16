import { emailsender, nameDisplay } from './formActions'
//The below part is reducer send email

const initialState = ""

export const emailIdReducer = (state = initialState, action) => {
    switch (action.type) {

        case "EMAIL":
            return action.payload

        default:
            return state
    }
}

//The below part is reducer name display

const initialNameState = ""

export const userNameReducer = (state = initialNameState, action) => {
    switch (action.type) {

        case "SHOW":
            return action.payload

        default:
            return state
    }
}