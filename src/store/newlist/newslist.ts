import {  Reducer } from "redux";
import apis from "../../api/apis";


export interface InitialState {
    inputValue:string;
    list: Array<Item>;
    originlist: Array<Item>;
    matches: Array<Item>;
    pageNum:number,
    counts:number,
    loading:boolean,
    showSearchBox:boolean
}

export interface Item {
    id: number;
    value: string;
    e_word:string;
    pics:string;
    c_word:string;
}

export const initialState: InitialState = {
    inputValue:'',
    list: [],
    originlist:[],
    matches:[],
    pageNum:1,
    counts:1,
    loading:false,
    showSearchBox:false
};

export const getNewListAsync=(pageNum:number)=>{
    return (dispatch:any)=>{
        dispatch({
            type: ActionType.Newslistloading,
            payload:true,
        })
        apis.getwords(pageNum).then((res:any)=>{
            let data =res.data;
            const backuppic='http://ydschool-online.nos.netease.com/GaoZhongluan_2_215_state_1548148785614001356_state_LJY.png?'

            data.list.forEach((item:any)=>{
                console.log(item)
                if(item.pics==''){
                    item.pics=backuppic
                    debugger
                }
            })

            dispatch({
                type: ActionType.Newslistgetlist,
                payload:data,
            })
            dispatch({
                type: ActionType.Newslistloading,
                payload:false,
            })

        })
    }
}


export enum ActionType {
    NewslistSubmit=1,
    NewslistChangeinput=2,
    Newslistselectitem=3,
    Newslistgetlist=4,
    Newslistloading=5,
    Newslistchangepage=6,
    NewslistToggleSearchBox=7
}

export const newslist: Reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === ActionType.NewslistChangeinput) {
        const tmp:Item[]=[];
        console.log('input='+payload)
        const inputlen = payload.length
        if(inputlen>0){
            state.list.forEach((item:Item)=>{
                if(item['e_word'].substring(0,inputlen)===payload){
                    if(tmp.length<10){
                        tmp.push(item)
                    }
                }
            })
            return { ...state, inputValue: payload,matches:tmp,list:tmp,showSearchBox:true };
        }
        if(inputlen==0){
            return { ...state, inputValue: '',matches:[],list:state.originlist,showSearchBox: false };
        }
    }

    if (type === ActionType.Newslistselectitem) {
        return {
            ...state,
            inputValue: payload,
            matches: [],
            showSearchBox: false
        };
    }

    if (type === ActionType.NewslistSubmit) {
        const v= state.inputValue.trim()
        if(v.length===0){
            alert('输入为空');
            return state
        }
        let ismatch=false
        state.list.forEach((item:Item)=>{
            if(item.e_word===v){
                ismatch=true
            }
        })
        if(!ismatch){
            alert('没有匹配的条件')
            return state
        }

        alert('提交数据中...')

        return state;
    }
    if (type === ActionType.Newslistgetlist) {

        return {
            ...state,
            list:[...state.list,...payload.list],
            originlist:[...state.list,...payload.list],
            counts:payload.count
        }
    }

    if (type === ActionType.Newslistloading) {
        return {
            ...state,
            loading:payload
        }
    }
    if (type === ActionType.Newslistchangepage) {
        return {
            ...state,
            pageNum:payload
        }
    }
    if (type === ActionType.NewslistToggleSearchBox) {
        return {
            ...state,
            showSearchBox:payload
        }
    }


    return state;
};
