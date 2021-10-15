import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";
import {message} from "antd";

export const book = createModel<RootModel>()({
    state: {
        nowPic:'',
        nowBookId:0,
        nowTitle:'',
        nowFinishTime:'',
        nowHasFinishedNum:0,
        nowTotalCount:0,
        isLoadedStudyBookList:false,
        isLoadedNowStudyBook:false,
        studyBookList:[],
        studyBookListCount:0,
        pageNum:1
    } as BookInitialState,
    reducers: {
        set_nowPic(state, payload: string) {
            return {...state,nowPic:payload}
        },
        set_nowBookId(state, payload: number) {
            return {...state,nowBookId:payload}
        },
        set_nowTitle(state, payload: string) {
            return {...state,nowTitle:payload}
        },
        set_nowFinishTime(state, payload: string) {
            return {...state,nowFinishTime:payload}
        },
        set_nowHasFinishedNum(state, payload: number) {
            return {...state,nowHasFinishedNum:payload}
        },
        set_nowTotalCount(state, payload: number) {
            return {...state,nowTotalCount:payload}
        },
        set_isLoadedStudyBookList(state, payload: boolean) {
            return {...state,isLoadedStudyBookList:payload}
        },
        set_isLoadedNowStudyBook(state, payload: boolean) {
            return {...state,isLoadedNowStudyBook:payload}
        },
        set_studyBookList(state, payload: []) {
            return {...state,studyBookList:payload}
        },
        set_studyBookListCount(state, payload: number) {
            return {...state,studyBookListCount:payload}
        },
        set_pageNum(state, payload: number) {
            return {...state,pageNum:payload}
        }
    },
    effects: (dispatch) => ({
        async getNowStudyBookAsync(anynumber:number, state) {
            const dis=dispatch.book;
            const p= await apis.post('dancife/getnowstudybook',{});
            if(p){
                const data =p.data;
                const list=data['list']
                if(list.length>0){
                    const item = list[0]
                    dis.set_nowBookId(item.id)
                    dis.set_nowTitle(item.book_name)
                    dis.set_nowPic(item.pic)
                    dis.set_nowTotalCount(item.count)
                }
            }
            dis.set_isLoadedNowStudyBook(true)
        },
        async getMyBookListAsync(data:QueryBook, state) {
            const dis=dispatch.book;
            dis.set_pageNum(data.pageNum)
            const p= await apis.post('dancife/getmybookslist',data);
            if(p){
                const data =p.data;
                dis.set_studyBookListCount(data['count'])
                dis.set_studyBookList(data['list'])
            }
            dis.set_isLoadedStudyBookList(true)
        },
        async deletemybook(data:deleteData, state) {

            const p= await apis.post('dancife/deletemybook',data);
            if(p){
                const d =p.data;
                message.success(d.msg)
            }
            setTimeout(()=>{
                window.location.reload()
            },1000)
        },
    }),
})

interface deleteData{
    book_id:string;
}

export interface BookInitialState {
    nowPic:string;
    nowBookId:number;
    nowTitle:string;
    nowFinishTime:string;
    nowHasFinishedNum:number;
    nowTotalCount:number;
    isLoadedStudyBookList:boolean;
    isLoadedNowStudyBook:boolean;
    studyBookList:Array<any>
    studyBookListCount:number
    pageNum:number
}


interface QueryBook{
    pageNum:number,
    pageSize:number
}