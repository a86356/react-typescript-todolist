import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";

export const choosebook = createModel<RootModel>()({
    state: {
        searchInputValue:'',
        isSearchLoading:false,
        isSearchLoaded:false,
        bookList:[],
        cateList:[],
        pageNum:1,
        pageSize:10,
        categoryId:0,
        count:0
    } as ChoosebookInitialState,
    reducers: {
        set_searchInputValue(state, payload: string) {
            return {...state,searchInputValue: payload}
        },
        set_isSearchLoading(state, payload: boolean) {
            return {...state,isSearchLoading: payload}
        },
        set_bookList(state, payload: []) {
            return {...state,bookList: payload}
        },
        set_cateList(state, payload: []) {
            return {...state,cateList: payload}
        },
        set_pageNum(state, payload: number) {
            return {...state,pageNum: payload}
        },
        set_categoryId(state, payload: number) {
            return {...state,categoryId: payload}
        },
        set_count(state, payload: number) {
            return {...state,count: payload}
        },
        set_isSearchLoaded(state, payload: boolean) {
            return {...state,isSearchLoaded: payload}
        },

    },
    effects: (dispatch) => ({
        async getAllCategoryAsync(anynumber:number, state) {
            const dis = dispatch.choosebook;
            const p= await apis.post('dancife/getallcategory',{});
            if(p){
                const data = p.data;
                const category_id = data['list'][0].id
                dis.set_cateList(data['list'])
                dis.set_categoryId(category_id)
            }
        },
        async getBookListAsync(data:QueryBook, state) {
            const dis = dispatch.choosebook;
            dis.set_isSearchLoading(true)
            dis.set_pageNum(data.pageNum)
            if(data.category_id){
                dis.set_categoryId(data.category_id)
            }
            const p= await apis.post('dancife/getbooklist',data);
            if(p){
                const data = p.data;
                dis.set_bookList(data['list'])
                dis.set_count(data['count'])
            }
            dis.set_isSearchLoading(false)
            dis.set_isSearchLoaded(true)
        },
        async addMyBookAsync(data:IAddBook, state) {
            const p= await apis.post('dancife/addmybook',{book_id:data.book_id});
            if(p){
                if(data.callback){
                    data.callback();
                }
            }
        },
    }),
})

interface IAddBook {
    book_id:number;
    callback:any
}

export interface ChoosebookInitialState {
    searchInputValue:string;
    isSearchLoading:boolean;
    isSearchLoaded:boolean;
    bookList:[]
    cateList:[]
    pageNum:number;
    categoryId:number;
    count:number;
    pageSize:number
}
interface QueryBook{
    book_id?:number,
    book_name?:string,
    pageNum:number,
    category_id?:number,
    pageSize:number
}