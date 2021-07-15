//The below part is action show courses

export const courseNum = (show) => {
    return {
        type: "NUM",
        payload: show
    }
}


//The below part is reducer show courses

const initialState2 = 1

export const change2 = (state = initialState2, action) => {
    switch (action.type) {

        case "NUM":
            return action.payload

        default:
            return state
    }
}