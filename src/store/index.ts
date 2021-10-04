import { Action, Reducer,applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import {newslist,InitialState} from "./newlist/newslist";

import { createStore,combineReducers } from "redux";

const rootReducers = combineReducers({
    searchbar: newslist,
})
export interface IRootState{
    searchbar:Reducer & InitialState;
}

export const store = createStore(rootReducers, applyMiddleware(thunk));
