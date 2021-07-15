//The below part is action for selecting course difficulty

export const difficultySetting = (show) => {
    return {
        type: "DIFFICULTY",
        payload: show
    }
}


//The below part is reducer for selecting course difficulty

const initialState5 = 1

export const change5 = (state = initialState5, action) => {
    switch (action.type) {

        case "DIFFICULTY":
            return action.payload

        default:
            return state
    }
}