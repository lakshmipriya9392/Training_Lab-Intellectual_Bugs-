import { testIdSetting } from "./testAction"

const initialState = 0

export const testIdReducer = (state = initialState, action) => {
    switch (action.type) {

        case "TEST_ID":
            return action.payload

        default:
            return state
    }
}