import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";
import {SEP_1,SEP_2,SEP_3} from "@/const/const";
import {isEmpty} from "@/utils/ValidateUtils";
import {message} from "antd";

const c={
    id:0,
    book_id:0,
    book_name:'',
    section_id:0,
    section_name:'',
    e_word:'',
    c_word:'',
    addtional:'',
    sentence:'',
    pics:'',
    is_update:0,
    uk_yb:'',
    uk_audio:'',
    is_lock:0,
    en_yb:'',
    en_audio:'',
    wordgroup:'',
    wordgroup_list:[],
    sort:0,
    all_sort:0,
    update_time:0,
    video_url:'',
    video_name:'',
    is_show:0,
    c_word_list:[],
    is_collected:0,
    is_test_right:0,
    is_now_test_right:0
}
export const study = createModel<RootModel>()({
    state: {
        todayStudyList: [],
        todayStudyCount: 0,
        todayStudyCurrent: c,
        todayStudyCurrentIndex: 0,
        pageSize: 10,
        pageNum: 1,
        todayStudyNum:0,
        todayReviewNum:0,
        isLoading:false
    }  as StudyInitialState,
    reducers: {
        set_todayStudyList(state, payload:Array<IWordItem>) {
            return {...state,todayStudyList: payload}
        },
        set_todayStudyCount(state, payload: number) {
            return {...state,todayStudyCount: payload}
        },
        set_pageSize(state, payload: number) {
            return {...state,pageSize: payload}
        },
        set_pageNum(state, payload: number) {
            return {...state,pageNum: payload}
        },
        set_todayStudyCurrent(state, payload: IWordItem) {
            return {...state,todayStudyCurrent: payload}
        },
        set_todayStudyCurrentIndex(state, payload: number) {
            return {...state,todayStudyCurrentIndex: payload}
        },
        set_updatecurrentcollected(state, payload: number) {
            const c = state.todayStudyCurrent;
            c.is_collected = payload
            return {...state,todayStudyCurrent: c}
        },
        set_todayStudyNum(state, payload: number) {
            return {...state,todayStudyNum: payload}
        },
        set_todayReviewNum(state, payload: number) {
            return {...state,todayReviewNum: payload}
        },
        set_isLoading(state, payload: boolean) {
            return {...state,isLoading: payload}
        },

    },
    effects: (dispatch) => ({
        async getTodayStudyAsync(datamy:ITodayStudy, state) {
            const dis = dispatch.study;
            dis.set_isLoading(true)
            // if(datamy.isPage){
            //     dis.set_todayStudyList([])
            // }

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

                    //测试是否正确
                    list[i].is_test_right=0  //1 ok 2 fail
                }

                if(datamy.isPage){
                    dis.set_todayStudyList(list)
                }else{
                    dis.set_todayStudyList([...state.study.todayStudyList,...list])
                }

                dis.set_todayStudyCount(data['count'])

                if(isEmpty(state.study.todayStudyCurrent.e_word)){
                    dis.set_todayStudyCurrent(list[0])
                }
            }
        },
        async updatestudyprogress(data:IUpdateProgress, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/updatemywords',data);
            if(p){
                const data = p.data;
            }
        },
        async updateuserwordcollected(data:IUpdateuserwordcollected, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/updatecollectword',data);
            if(p){
                const data = p.data;
            }
        },
        async getuserstudytodaybase(data:Igetuserstudytodaybase, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/getuserstudytodaybase',data);
            if(p){
                const data = p.data;
                dis.set_todayStudyNum(data['study_number'])
                dis.set_todayReviewNum(data['review_number'])
            }
        },
        async updateSettingAsync(data:IUpdatesetting, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/updateusersetting',data);
            if(p){
                const data = p.data;
                message.success('设置成功')
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
}

interface IAddBook {
    book_id:number;
    callback:any
}

export interface StudyInitialState {
    todayStudyList:Array<IWordItem>,
    todayStudyCount:number,
    pageNum:number,
    pageSize:number,
    todayStudyCurrent:IWordItem,
    todayStudyCurrentIndex:number,
    todayStudyNum:number,
    todayReviewNum:number,
    isLoading:boolean
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