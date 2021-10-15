import { Action, Reducer,applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import {newslist,InitialState} from "./newlist/newslist";
import {home,HomeInitialState} from "@/store/home/home";
import { createStore,combineReducers } from "redux";
import {choosebook,ChoosebookInitialState} from "@/store/choosebook/choosebook";
import {book,BookInitialState} from "@/store/book/book";

const rootReducers = combineReducers({
    searchbar: newslist,
    home:home,
    choosebook:choosebook,
    book:book
})
export interface IRootState{
    searchbar:Reducer & InitialState;
    home:Reducer & HomeInitialState;
    choosebook:Reducer & ChoosebookInitialState
    book:Reducer & BookInitialState
}

export const store = createStore(rootReducers, applyMiddleware(thunk));
