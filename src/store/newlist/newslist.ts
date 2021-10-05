import {  Reducer } from "redux";
import apis from "../../api/apis";


export interface InitialState {
    inputValue:string;
    list: Array<Item>;
    originlist: Array<Item>;
    matches: Array<Item>;
    selectedlist: Array<Item>;
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
    selectedlist:[],
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
            const data =res.data;
            const backuppic='http://ydschool-online.nos.netease.com/GaoZhongluan_2_215_state_1548148785614001356_state_LJY.png?'

            data.list.forEach((item:any)=>{
                if(item.pics==''){
                    item.pics=backuppic
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
    NewslistToggleSearchBox=7,
    Newslistdeleteitem=8
}

export const newslist: Reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === ActionType.NewslistChangeinput) {
        const tmp:Item[]=[];
        const inputlen = payload.length
        if(inputlen>0){

            state.originlist.forEach((item:Item)=>{
                if(item['e_word'].substring(0,inputlen)===payload){
                    if(tmp.length<10){
                        tmp.push(item)
                    }
                }
            })

            return { ...state, inputValue: payload,matches:tmp,showSearchBox:true };
        }
        if(inputlen==0){
            return { ...state, inputValue: '',matches:[],list:state.originlist,showSearchBox: false };
        }
    }

    if (type === ActionType.Newslistselectitem) {
        let matchItem=null;
        state.list.forEach((item:Item)=>{
            if(item.e_word==payload){
                matchItem=item
            }
        })
        const tmp:string[]=[]
        let end=[];

        state.selectedlist.forEach((item:Item)=>{
            tmp.push(item.e_word)
        })
        if(tmp.indexOf(payload)===-1){
            end=[...state.selectedlist,matchItem]
        }else{
            end=[...state.selectedlist]
        }
        return {
            ...state,
            inputValue: '',
            matches: [],
            showSearchBox: false,
            selectedlist:end
        };
    }

    if (type === ActionType.NewslistSubmit) {

        if(state.selectedlist.length==0){
            alert("未输入，请先输入")
            return
        }

        return {
            ...state,
            list: [...state.selectedlist],
            showSearchBox: false
        };
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
    if (type === ActionType.Newslistdeleteitem) {

        const tmp:Item[]=[];

        state.selectedlist.forEach((item:Item)=>{
            if(item.e_word!=payload){
                tmp.push(item)
            }
        })
        return {
            ...state,
            selectedlist:tmp,
            list:tmp.length>0?tmp:state.originlist
        }
    }
    return state;
};
