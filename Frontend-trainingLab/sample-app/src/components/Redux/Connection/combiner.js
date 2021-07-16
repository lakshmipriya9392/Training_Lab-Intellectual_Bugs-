import { combineReducers } from "redux";
import { courseNameReducer, difficultyReducer, courseIdReducer } from "../course/courseReducer";
import { emailIdReducer, userNameReducer } from "../form/formReducer";
import { testIdReducer } from "../test/testReducer";

export const combineReducer = combineReducers({
    courseNameReducer,
    difficultyReducer,
    courseIdReducer,
    emailIdReducer,
    userNameReducer,
    testIdReducer
})