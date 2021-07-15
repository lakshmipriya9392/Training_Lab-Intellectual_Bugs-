//The below part is action name display

export const nameDisplay = (show) => {
    return {
        type: "SHOW",
        payload: show
    }
}


//The below part is reducer name display

const initialState = ""

export const change = (state = initialState, action) => {
    switch (action.type) {

        case "SHOW":
            return action.payload

        default:
            return state
    }
}











