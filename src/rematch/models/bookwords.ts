import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";
import {SEP_1, SEP_2, SEP_3, Study_type} from "@/const/const";
import {isEmpty} from "@/utils/ValidateUtils";
import {message} from "antd";


export const bookwords = createModel<RootModel>()({
    state: {
        pageNum:1,
        pageSize:10,
        list:[],
        count:0,
        isLoading:false,
        leftId:Study_type.UNSTUDY_WORD,
        first_study:0
    }  as BookWordsInitialState,
    reducers: {
        set_pageSize(state, payload: number) {
            return {...state,pageSize: payload}
        },
        set_pageNum(state, payload: number) {
            return {...state,pageNum: payload}
        },
        set_list(state, payload: Array<IWordItem>) {
            return {...state,list: payload}
        },
        set_count(state, payload: number) {
            return {...state,count: payload}
        },
        set_isLoading(state, payload: boolean) {
            return {...state,isLoading: payload}
        },
        set_leftId(state, payload: number) {
            return {...state,leftId: payload}
        },
    },
    effects: (dispatch) => ({
        async getStudyWordListAsync(datamy:ITodayStudy, state) {
            const dis = dispatch.bookwords;
            dis.set_isLoading(true)

            const p= await apis.post('dancife/gettodaywords',datamy);
            dis.set_isLoading(false)
            if(p){
                const data = p.data;
                const list:any[] = data['list']
                const len = data['list'].length
                for (let i=0;i<len;i++){
                    const current = list[i]
                    const wg = current.wordgroup;
                    const c_word = current.c_word;
                    //词组
                    if(wg && wg.length>0){
                        const l1=  wg.split(SEP_2)
                        const tmp:any[]=[];
                        l1.forEach((item:any)=>{
                            const arr= item.split(SEP_1);
                            tmp.push({
                                key:arr[0],
                                value:arr[1]
                            })
                        })
                        list[i].wordgroup_list = tmp
                    }else{
                        list[i].wordgroup_list = []
                    }
                    //中文
                    if(c_word.indexOf('|')!=-1){
                        const arr2= c_word.split(SEP_3)
                        const tmp1:any[]=[];
                        arr2.forEach((item:any,index:number)=>{
                            const arr= item.split(SEP_1);
                            tmp1.push({
                                value:arr[0],
                                id:index
                            })
                        })
                        list[i].c_word_list = tmp1
                    }else{
                        list[i].c_word_list=[{value:list[i].c_word,id:1}]
                    }
                }
                dis.set_list(list)
                dis.set_count(data['count'])

            }
        },

    }),
})
interface IUpdatesetting{
    fy:string
}

interface Igetuserstudytodaybase{
    book_id:number
}

interface IUpdateuserwordcollected{
    book_id:number,
    e_word:string,
    is_collected:number
}

interface IUpdateProgress {
    book_id:number,
    e_word:string,
    result:number
}

export interface IWordItem{
    id:number;
    book_id:number;
    book_name:string,
    section_id:number,
    section_name:string,
    e_word:string,
    c_word:string,
    addtional:string,
    sentence:string,
    pics:string,
    is_update:number,
    uk_yb:string,
    uk_audio:string,
    is_lock:number,
    en_yb:string,
    en_audio:string,
    wordgroup:string,
    wordgroup_list:Array<any>,
    sort:number,
    all_sort:number,
    update_time:number,
    video_url:string,
    video_name:string,
    is_show:number,
    c_word_list:Array<any>,
    is_collected:number
    is_test_right:number
    is_now_test_right:number
    first_study:number
    review_times:number
    right_times:number
    fail_times:number
    right_percent:number
}

interface IAddBook {
    book_id:number;
    callback:any
}

export interface BookWordsInitialState {
    pageNum:number;
    pageSize:number;
    list:Array<IWordItem>,
    count:number,
    isLoading:boolean,
    leftId:number
}
interface QueryBook{
    book_id?:number,
    book_name?:string,
    pageNum:number,
    category_id?:number,
    pageSize:number
}
interface ITodayStudy{
    book_id:number;
    pageNum:number,
    pageSize:number,
    type:number,
    isPage:boolean
}