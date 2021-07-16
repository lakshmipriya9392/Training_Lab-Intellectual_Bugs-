import { combineReducers } from "redux";
import { courseNameReducer, difficultyReducer, courseIdReducer } from "../Course/courseReducers";
import { emailIdReducer, userNameReducer } from "../Form/formReducer";
import { testIdReducer } from "../Test/testReducer";

export const combineReducer = combineReducers({
    courseNameReducer,
    difficultyReducer,
    courseIdReducer,
    emailIdReducer,
    userNameReducer,
    testIdReducer
})