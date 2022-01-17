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
    is_now_test_right:0,
    num_id:0
}
export const study = createModel<RootModel>()({
    state: {
        todayStudyList: [],
        todayStudyCount: 0,
        todayStudyCurrent: c,
        todayStudyCurrentIndex: 0,
        pageSize: 10,
        pageSizeMax:500,
        pageNum: 1,
        todayStudyNum:0,
        todayReviewNum:0,
        isLoading:false,
        origin_text:'',
        orgin_text_arr:[],
        user_text:'',
        user_text_arr:[],
        audio_url:'',
        tc_history_list:[],
        tc_pageNum:1,
        tc_pageSize:10,
        tc_count:0
    }  as StudyInitialState,
    reducers: {
        set_tc_count(state, payload:number) {
            return {...state,tc_count: payload}
        },
        set_tc_pageSize(state, payload:number) {
            return {...state,tc_pageSize: payload}
        },
        set_tc_pageNum(state, payload:number) {
            return {...state,tc_pageNum: payload}
        },
        set_tc_history_list(state, payload:Array<ITchistoryitem>) {
            return {...state,tc_history_list: payload}
        },
        set_audio_url(state, payload:string) {
            return {...state,audio_url: payload}
        },
        set_origin_text(state, payload:string) {
            return {...state,origin_text: payload}
        },
        set_orgin_text_arr(state, payload:Array<OriginItem>) {
            return {...state,orgin_text_arr: payload}
        },
        set_user_text(state, payload:string) {
            return {...state,user_text: payload}
        },
        set_user_text_arr(state, payload:IMytext[]) {
            return {...state,user_text_arr: payload}
        },
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

        async getOneArticleAsync(article_id:string, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/getonearticle',{
                article_id:article_id
            });

            if(p){
                const {lrc_txt,audio_url} = p.data;

                dis.set_origin_text(lrc_txt)
                dis.set_audio_url(audio_url)
                dis.set_orgin_text_arr(create_lrc_arr(lrc_txt))

            }
        },
        async getTodayStudyAsync(datamy:ITodayStudy, state) {
            const dis = dispatch.study;
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

                    //测试是否正确
                    list[i].is_test_right=0  //1 ok 2 fail
                }

                if(datamy.isPage){
                    dis.set_todayStudyList(list)
                }else{
                    const nw = [...state.study.todayStudyList,...list]
                    dis.set_todayStudyList(nw)
                }

                dis.set_todayStudyCount(data['count'])

                if(isEmpty(state.study.todayStudyCurrent.e_word) && list.length>0){

                    dis.set_todayStudyCurrent(list[0])
                }
            }
        },
        async updateuserarticle(data:IUpdatemyarticle, state) {
            const p= await apis.post('dancife/updateuserarticle',data);
        },
        create_user_text_arr(data:any, state){
            const user_text = state.study.user_text
            const orgin_text_arr = state.study.orgin_text_arr
            if(user_text){
                const arr =  create_user_text_arr(user_text);
                const user_text_arr = compare_text_arr(arr,orgin_text_arr)
                const dis = dispatch.study;
                dis.set_user_text_arr(user_text_arr)
            }

        },
        async updateuserwordcollected(data:IUpdateuserwordcollected, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/updatecollectword',data);
            if(p){
                const data = p.data;
            }
        },
        async getuserstudytodaybaseAsync(data:Igetuserstudytodaybase, state) {
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

        async getuserarticlAsync(data:IGetuserarticle, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/getuserarticle',data);
            if(p){
                const data = p.data;
                if(data.code==-1){
                    dis.set_user_text('')
                    dis.set_user_text_arr([])
                    return
                }
                dis.set_user_text(data.uid_text)

            }
        },
        async getuserarticllistAsync(data:IGetuserarticlelist, state) {
            const dis = dispatch.study;
            const p= await apis.post('dancife/getuserarticlelist',data);
            if(p){
                const data = p.data;
                const list = data['list']
                for(let i=0;i<list.length;i++){
                    list[i]['key']=list[i]['id']
                }

                dis.set_tc_history_list(list)
                dis.set_tc_count(data['count'])
            }
        },
    }),
})


interface IGetuserarticlelist{
    pageNum:number
    pageSize:number
}

interface  IGetuserarticle{
    article_id:string
}
interface IUpdatemyarticle{
    article_id:string | number,
    mytext:string ,
}

const create_lrc_arr=(lrc:string)=>{
    const arr= lrc.split(' ');
    const tmp:any=[]
    let count=0
    arr.forEach((item,idx)=>{
        tmp.push({
            id:++count,
            txt:item+" "
        })
    })

    return tmp;
}

const create_user_text_arr=(txt:string):Array<IMytext>=>{
    const tmp: Array<IMytext> = []
    if(txt && txt.length==0) {
        return tmp
    }
    const arr = txt.split(' ');

    let count=0
    arr.forEach((item,idx)=>{
        tmp.push({
            id:++count,
            txt:item+" ",
            is_ok:1,
            fixed_txt:''
        })
    })
    return tmp;
}
export interface IMytext{
    id:number,
    txt:string,
    is_ok:number,
    fixed_txt:string
}



const compare_text_arr=(myarr:IMytext[],origin_arr:OriginItem[])=>{
    if(myarr.length==0 || origin_arr.length==0){
        return []
    }
    for (let i=0;i<myarr.length;i++){
        const my=myarr[i]
        const ori=origin_arr[i]
        if(my['id']==ori['id']){
            if(my['txt']==ori['txt']){
                myarr[i]['is_ok']=1
                myarr[i]['fixed_txt']=''
            }else{
                myarr[i]['is_ok']=0
                myarr[i]['fixed_txt']=origin_arr[i]['txt']
            }
        }
    }
    return myarr;

}

interface IMyonetxt{
    id:number,
    txt:string,
    is_ok:number,
    fixed_txt:string
}

const compare_two_arr=(orign:[],mytxt:Array<IMyonetxt>)=>{
    for (let i=0;i<mytxt.length;i++){
        const my_txt= mytxt[i]['txt']
        if(!isEmpty(my_txt)){
            if(mytxt==orign[i]['txt']){
                mytxt[i]['is_ok']=1
            }else{
                mytxt[i]['is_ok']=0
                mytxt[i]['fixed_txt']=orign[i]['txt']
            }
        }
    }
    return mytxt;
}



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
    result:number,
    study_type:number
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
    num_id:number
}

interface IAddBook {
    book_id:number;
    callback:any
}

export interface OriginItem{
    id:number,
    txt:string
}

export interface StudyInitialState {
    todayStudyList:Array<IWordItem>,
    todayStudyCount:number,
    pageNum:number,
    pageSize:number,
    pageSizeMax:number,
    todayStudyCurrent:IWordItem,
    todayStudyCurrentIndex:number,
    todayStudyNum:number,
    todayReviewNum:number,
    isLoading:boolean,
    origin_text:string,
    orgin_text_arr:Array<OriginItem>
    user_text:string,
    user_text_arr:Array<IMytext>,
    audio_url:string,
    tc_history_list:Array<ITchistoryitem>
    tc_pageNum:number,
    tc_pageSize:number,
    tc_count:number
}

interface ITchistoryitem{
    id:number,
    book_name:string,
    subfix:string
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