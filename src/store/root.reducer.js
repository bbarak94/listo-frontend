import { combineReducers } from 'redux'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import {AppReducer} from './reducers/app.reducer.js'
import {UserReducer} from './reducers/user.reducer'
import {BoardReducer} from './reducers/board.reducer'

export const rootReducer = combineReducers({
   userModule: UserReducer,
   boardModule: BoardReducer,
   appModule: AppReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
