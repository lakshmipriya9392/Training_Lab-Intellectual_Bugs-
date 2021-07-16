import { testIdReducer } from "./testReducer"
//The below part is action for selecting test id

export const testIdSetting = (show) => {
    return {
        type: "TEST_ID",
        payload: show
    }
}


