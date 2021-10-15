import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import apis from "@/api/apis";


export const studyprogress = createModel<RootModel>()({
    state: {
        totalStudyCount: 0,
        list:[]
    }  as IStudyprogress,
    reducers: {
        set_list(state, payload:Array<Item>) {
            return {...state,list: payload}
        },
        set_totalStudyCount(state, payload:number) {
            return {...state,totalStudyCount: payload}
        },

    },
    effects: (dispatch) => ({
        async getstudyprogressinfoAsync(data:number, state) {
            const dis = dispatch.studyprogress;
            const p= await apis.post('dancife/getstudyinfo',data);
            if(p){
                const data = p.data;
                dis.set_totalStudyCount(data['totalStudy'])
                dis.set_list(data['list'])
            }
        },
    }),
})

interface Item{
    day:string,
    first:number,
    review:number
}

export interface IStudyprogress {
    totalStudyCount:number,
    list:Array<Item>
}
