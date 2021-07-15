//The below part is action send email

export const emailsender = (show) => {
    return {
        type: "EMAIL",
        payload: show
    }
}


//The below part is reducer send email

const initialState3 = ""

export const change3 = (state = initialState3, action) => {
    switch (action.type) {

        case "EMAIL":
            return action.payload

        default:
            return state
    }
}