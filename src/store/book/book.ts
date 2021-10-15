import {  Reducer } from "redux";
import ActionType from "@/store/book/actionType";

export interface BookInitialState {
    nowPic:string;
    nowBookId:number;
    nowTitle:string;
    nowFinishTime:string;
    nowHasFinishedNum:number;
    nowTotalCount:number;
    isLoadingStudyBookList:boolean;
    isLoadingNowStudyBook:boolean;
    isLoadedStudyBookList:boolean;
    isLoadedNowStudyBook:boolean;
    studyBookList:Array<any>
    studyBookListCount:number
    pageNum:number
}


export const initialState: BookInitialState = {
    nowPic:'',
    nowBookId:0,
    nowTitle:'',
    nowFinishTime:'',
    nowHasFinishedNum:0,
    nowTotalCount:0,
    isLoadingStudyBookList:false,
    isLoadingNowStudyBook:false,
    isLoadedStudyBookList:false,
    isLoadedNowStudyBook:false,
    studyBookList:[],
    studyBookListCount:0,
    pageNum:1
};

export const book: Reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === ActionType.ACTION_BOOK_SET_NOW_PIC) {return {...state, nowPic:payload}}
    if (type === ActionType.ACTION_BOOK_SET_NOW_BOOKID) {return {...state, nowBookId:payload}}
    if (type === ActionType.ACTION_BOOK_SET_NOW_TITLE) {return {...state, nowTitle:payload}}
    if (type === ActionType.ACTION_BOOK_SET_FINISHTIME) {return {...state, nowFinishTime:payload}}
    if (type === ActionType.ACTION_BOOK_SET_HASFINISHIEDNUM) {return {...state, nowHasFinishedNum:payload}}
    if (type === ActionType.ACTION_BOOK_SET_NOWTOTALCOUNT) {return {...state, nowTotalCount:payload}}
    if (type === ActionType.ACTION_BOOK_SET_STUDYBOOKLIST) {return {...state, studyBookList:payload}}
    if (type === ActionType.ACTION_BOOK_SET_ISLOADINGSTUDYBOOKLIST) {return {...state, isLoadingStudyBookList:payload}}
    if (type === ActionType.ACTION_BOOK_SET_ISLOADINGNOWSTUDYBOOK) {return {...state, isLoadingNowStudyBook:payload}}
    if (type === ActionType.ACTION_BOOK_SET_STUDYBOOkLISTCOUNT) {return {...state, studyBookListCount:payload}}
    if (type === ActionType.ACTION_BOOK_SET_STUDYBOOkLISTPAGENUM) {return {...state, pageNum:payload}}
    if (type === ActionType.ACTION_BOOK_SET_ISLOADEDSTUDYBOOKLIST) {return {...state, isLoadedStudyBookList:payload}}
    if (type === ActionType.ACTION_BOOK_SET_ISLOADEDNOWSTUDYBOOK) {return {...state, isLoadedNowStudyBook:payload}}


    return state;
};
