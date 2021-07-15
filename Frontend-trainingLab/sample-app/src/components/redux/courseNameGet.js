//The below part is action for selecting course

export const courseSelector = (show) => {
    return {
        type: "COURSE",
        payload: show
    }
}


//The below part is reducer for selecting course

const initialState4 = 1

export const change4 = (state = initialState4, action) => {
    switch (action.type) {

        case "COURSE":
            return action.payload

        default:
            return state
    }
}