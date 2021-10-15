import {  Reducer } from "redux";
import ActionType from "@/store/choosebook/actionType";

export interface ChoosebookInitialState {
    searchInputValue:string;
    isSearchLoading:boolean;
    bookList:[]
    cateList:Array<CategoryItem>
    pageNum:number;
    categoryId:number;
    count:number
}
export interface CategoryItem{
    id:number,
    category_name:string
}

export const initialState: ChoosebookInitialState = {
    searchInputValue:'',
    isSearchLoading:false,
    bookList:[],
    cateList:[],
    pageNum:1,
    categoryId:0,
    count:0
};

export const choosebook: Reducer = (state = initialState, action) => {
    const { type, payload } = action;

    if (type === ActionType.ACTION_SET_INPUTVALUE) {return {...state, searchInputValue:payload}}
    if (type === ActionType.ACTION_SET_BOOKLIST) {return {...state, bookList:payload}}

    if (type === ActionType.ACTION_SET_CATEGORLIST) {return {...state, cateList:payload.list,}}

    if (type === ActionType.ACTION_SET_CATEGORY_ID) {return {...state, categoryId:payload}}
    if (type === ActionType.ACTION_SET_SEARCHLOADING) {return {...state, isSearchLoading:payload}}
    if (type === ActionType.ACTION_SET_PAGENUM) {return {...state, pageNum:payload}}
    if (type === ActionType.ACTION_SET_COUNT) {return {...state, count:payload}}


    return state;
};
