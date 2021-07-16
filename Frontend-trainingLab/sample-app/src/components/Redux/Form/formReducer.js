import { emailsender, nameDisplay } from './formAction'

const initialState = ""

export const emailIdReducer = (state = initialState, action) => {
    switch (action.type) {

        case "EMAIL":
            return action.payload

        default:
            return state
    }
}



const initialNameState = ""

export const userNameReducer = (state = initialNameState, action) => {
    switch (action.type) {

        case "SHOW":
            return action.payload

        default:
            return state
    }
}