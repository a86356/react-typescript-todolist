import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";
import {message} from "antd";

export const bookmissionsetting = createModel<RootModel>()({
    state: {
        nowPic:'',
        nowBookId:0,
        nowTitle:'',
        nowFinishTime:'',
        nowHasFinishedNum:0,
        nowTotalCount:0,
        studyScheduleList:[],
        planStudyNum:10,
        isLoadingTable:false
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
        set_studyScheduleList(state, payload: []) {
            return {...state,studyScheduleList:payload}
        },
        set_planStudyNum(state, payload: number) {
            return {...state,planStudyNum:payload}
        },
        set_isLoadingTable(state, payload: boolean) {
            return {...state,isLoadingTable:payload}
        },

    },
    effects: (dispatch) => ({
        async getStudyBookAsync(data:bookinfoQuery, state) {
            const dis=dispatch.bookmissionsetting;
            const p= await apis.post('dancife/getbookstudyinfo',data);
            if(p){
                const item =p.data;
                dis.set_nowBookId(item.id)
                dis.set_nowTitle(item.book_name)
                dis.set_nowPic(item.pic)
                dis.set_nowTotalCount(item.count)
            }
        },
        async getStudySchedule(data:queryStudySchedule, state) {
            const dis=dispatch.bookmissionsetting;
            dis.set_isLoadingTable(true)
            const p= await apis.post('dancife/getstudyschedule',data);
            if(p){
                const data =p.data;
                dis.set_studyScheduleList(data['list'])
            }
            dis.set_isLoadingTable(false)
        },
        async finishdaystudynumberAsync(data:finishdaystudynumberPost, state) {
            const dis=dispatch.bookmissionsetting;

            const p= await apis.post('dancife/finishdaystudynumber',data);
            if(p){
                const data =p.data;
                message.success('设置成功~~')
            }
        },

    }),
})

interface  finishdaystudynumberPost{
    book_id:number,
    day_study_number:number
}

interface queryStudySchedule {
    book_id:number;
    plan_study_day:number
}

interface bookinfoQuery{
    book_id:number ;
}

export interface BookInitialState {
    nowPic:string;
    nowBookId:number;
    nowTitle:string;
    nowFinishTime:string;
    nowHasFinishedNum:number;
    nowTotalCount:number;
    studyScheduleList:[];
    planStudyNum:number;
    isLoadingTable:boolean
}

