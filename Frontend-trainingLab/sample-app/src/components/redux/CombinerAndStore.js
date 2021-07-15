import { combineReducers } from "redux";
import { createStore } from 'redux'
import { change } from './NameDisplay'
import { change2 } from "./courseNumGet";
import { change3 } from "./emailGet";
import { change4 } from "./courseNameGet";
import { change5 } from "./courseDifficultyGet";
import { change6 } from "./TestIdGet";

//THe below part is reducer combiner

const combineReducer = combineReducers({
    change,
    change2,
    change3,
    change4,
    change5,
    change6
    //any more reducers
})

//The below part is to connect reducers to store

const store = createStore(combineReducer)

export default store