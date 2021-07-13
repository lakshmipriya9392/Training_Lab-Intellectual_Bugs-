import { combineReducers } from "redux";
import { createStore } from 'redux'


//The below part is action name display

export const nameDisplay = (show) => {
    return {
        type: "SHOW",
        payload: show
    }
}


//The below part is reducer name display

const initialState = ""

const change = (state = initialState, action) => {
    switch (action.type) {

        case "SHOW":
            return action.payload

        default:
            return state
    }
}

//The below part is action show courses

export const courseNum = (show) => {
    return {
        type: "NUM",
        payload: show
    }
}


//The below part is reducer show courses

const initialState2 = 1

const change2 = (state = initialState2, action) => {
    switch (action.type) {

        case "NUM":
            return action.payload

        default:
            return state
    }
}

//The below part is action send email

export const emailsender = (show) => {
    return {
        type: "EMAIL",
        payload: show
    }
}


//The below part is reducer send email

const initialState3 = ""

const change3 = (state = initialState3, action) => {
    switch (action.type) {

        case "EMAIL":
            return action.payload

        default:
            return state
    }
}

//The below part is action for selecting course

export const courseSelector = (show) => {
    return {
        type: "COURSE",
        payload: show
    }
}


//The below part is reducer for selecting course

const initialState4 = 1

const change4 = (state = initialState4, action) => {
    switch (action.type) {

        case "COURSE":
            return action.payload

        default:
            return state
    }
}

//The below part is action for selecting course difficulty

export const difficultySetting = (show) => {
    return {
        type: "DIFFICULTY",
        payload: show
    }
}


//The below part is reducer for selecting course difficulty

const initialState5 = 1

const change5 = (state = initialState5, action) => {
    switch (action.type) {

        case "DIFFICULTY":
            return action.payload

        default:
            return state
    }
}

//The below part is action for selecting test id

export const testIdSetting = (show) => {
    return {
        type: "TEST_ID",
        payload: show
    }
}


//The below part is reducer for selecting test id

const initialState6 = 0

const change6 = (state = initialState6, action) => {
    switch (action.type) {

        case "TEST_ID":
            return action.payload

        default:
            return state
    }
}

//THe below part is reducer combiner

const combineReducer = combineReducers({
    change,
    change2,
    change3,
    change4,
    change5,
    change6
    //any more reducers
})

//The below part is to connect reducers to store

const store = createStore(combineReducer)

export default store