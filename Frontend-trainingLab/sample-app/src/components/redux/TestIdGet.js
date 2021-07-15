//The below part is action for selecting test id

export const testIdSetting = (show) => {
    return {
        type: "TEST_ID",
        payload: show
    }
}


//The below part is reducer for selecting test id

const initialState6 = 0

export const change6 = (state = initialState6, action) => {
    switch (action.type) {

        case "TEST_ID":
            return action.payload

        default:
            return state
    }
}