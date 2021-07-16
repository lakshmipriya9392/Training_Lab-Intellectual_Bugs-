import { createStore } from 'redux'
import { combineReducer } from './combiner'

const store = createStore(combineReducer)

export default store