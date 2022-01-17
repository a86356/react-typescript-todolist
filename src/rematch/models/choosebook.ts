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
        count:0,
        oneList:[],
        twoList:[],
        threeList:[],
        oneId:0,
        twoId:0
    } as ChoosebookInitialState,
    reducers: {
        set_twoId(state, payload: number) {
            return {...state,twoId: payload}
        },
        set_oneId(state, payload: number) {
            return {...state,oneId: payload}
        },
        set_oneList(state, payload: []) {
            return {...state,oneList: payload}
        },
        set_twoList(state, payload: Array<oneItemChild>) {
            return {...state,twoList: payload}
        },
        set_threeList(state, payload: []) {
            return {...state,threeList: payload}
        },
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
        select_one(oneid:number,state){
            const dis = dispatch.choosebook;
            const onelist=state.choosebook.oneList;
            dis.set_oneId(oneid)
            onelist.forEach(item=>{
                if(item.id==oneid){
                    dis.set_twoList(item.child)
                    if(item.child.length>0){
                        dis.set_twoId(item.child[0].id)
                    }
                }
            })
        },
        async select_two(twoid:number,state){
            const dis = dispatch.choosebook;

            const oneId=state.choosebook.oneId;
            const pageSize=state.choosebook.pageSize;
            dis.set_twoId(twoid)
            dis.set_pageNum(1)

            const p= await apis.post('dancife/getarticlesbybookid',{
                  one_id:oneId,
                  book_id:twoid,
                  pageNum:1,
                  pageSize:pageSize,
            });
            if(p){
                const {list,count} = p.data;
                dis.set_threeList(list)
                dis.set_count(count)
            }
        },
        async getAllCategoryAsync(anynumber:number, state) {
            const dis = dispatch.choosebook;
            const p= await apis.post('dancife/getdiffcultbook',{});
            const pageSize=state.choosebook.pageSize;

            if(p){
                const data = p.data;
                const oneId = data[0]['id']
                const twoId = data[0]['child'][0]['id']
                dis.set_oneId(oneId)
                dis.set_twoId(twoId)
                dis.set_oneList(data)
                dis.set_twoList(data[0]['child'])
                const p2= await apis.post('dancife/getarticlesbybookid',{
                    one_id:oneId,
                    book_id:twoId,
                    pageNum:1,
                    pageSize:pageSize,
                });
               if(p2){
                   const {list,count} = p2.data;
                   dis.set_count(count)
                   dis.set_threeList(list)
               }
            }
        },
        async getBookListAsync(data:QueryBook, state) {
            const dis = dispatch.choosebook;
            const {oneId,twoId,pageSize} = state.choosebook

            dis.set_pageNum(data.pageNum)
            const p2= await apis.post('dancife/getarticlesbybookid',{
                one_id:oneId,
                book_id:twoId,
                pageNum:data.pageNum,
                pageSize:pageSize,
                book_name:data.book_name
            });
            if(p2){
                const {list,count} = p2.data;
                dis.set_count(count)
                dis.set_threeList(list)
            }
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

interface oneItemChild{
    book_name:string,
    diff_level_cn:string,
    id:number,
    sort:string
}

interface oneItem{
    child:Array<oneItemChild>,
    id:number,
    level:string
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
    pageSize:number,
    oneList:Array<oneItem>,
    twoList:Array<oneItemChild>,
    threeList:[],
    oneId:number,
    twoId:number,
}
interface QueryBook{
    book_id?:number,
    book_name?:string,
    pageNum:number,
    category_id?:number,
    pageSize:number
}