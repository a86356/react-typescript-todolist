import {createModel} from '@rematch/core'
import type {RootModel} from '../models'
import {message} from "antd";
import apis from "@/api/apis";
import {clearCache, setCache} from "@/utils/CacheUtils";
import {DEFAULT_YB, PHONE, TOKEN} from "@/const/const";

import {SubNav_type} from "@/const/const";

export const home = createModel<RootModel>()({
    state: {
        isShowLoginForm:false,
        isShowLoginLoading:false,
        isShowRegisterForm:false,
        isShowRegisterLoading:false,
        userPhone:'',
        isShowForgetpwdForm:false,
        isShowForgetpwdLoading:false,
        selectedSubNavId:SubNav_type.WORD_STUDY,
        nowFinishCount:0
    } as HomeInitialState,
    reducers: {
        set_isShowLoginForm(state, payload:boolean) {
            return {...state, isShowLoginForm:payload}
        },
        set_isShowLoginLoading(state, payload: boolean) {
            return {...state, isShowLoginLoading:payload}
        },
        set_isShowRegisterForm(state, payload: boolean) {
            return {...state,isShowRegisterForm:payload}
        },
        set_isShowRegisterLoading(state, payload: boolean) {
            return {...state, isShowRegisterLoading:payload}
        },
        set_userPhone(state, payload: string) {
            return {...state,userPhone:payload}
        },
        set_isShowForgetpwdForm(state, payload: boolean) {
            return {...state, isShowForgetpwdForm:payload}
        },
        set_isShowForgetpwdLoading(state, payload: boolean) {
            return {...state, isShowForgetpwdLoading:payload}
        },
        set_selectedSubNavId(state, payload: number) {
            return {...state, selectedSubNavId:payload}
        },
        set_logout(state, payload: any) {
            clearCache('phone')
            clearCache('token')
            return {...state, userPhone:''}
        },
        set_nowFinishCount(state, payload: number) {
            return {...state, nowFinishCount:payload}
        },
    },
    effects: (dispatch) => ({
        async loginAsync(payload: LoginData, state){
            dispatch.home.set_isShowLoginLoading(true)
            const p= await apis.post('dancife/login',payload);
            if(p){
                const data = p.data;
                message.success('登陆成功了呀~')
                setCache(PHONE,data.phone)
                setCache(TOKEN,data.token)
                setCache(DEFAULT_YB,data.fy)
                dispatch.home.set_userPhone(data.phone)
                dispatch.home.set_isShowLoginForm(false)
                if(payload.cb){
                    payload.cb()
                }
            }
            dispatch.home.set_isShowLoginLoading(false)
        },
        async registerAsync(payload: RegisterData, state){
            dispatch.home.set_isShowRegisterLoading(true)
            const p= await apis.post('dancife/register',payload);
            if(p){
                const data = p.data;
                message.success('注册成功啦~')
                setCache(PHONE,data.phone)
                setCache(TOKEN,data.token)
                dispatch.home.set_userPhone(data.phone)
                dispatch.home.set_isShowRegisterForm(false)
            }
            dispatch.home.set_isShowRegisterLoading(false)
        },
        async fotgetpwdAsync(payload: ForgetpwdData, state){
            dispatch.home.set_isShowForgetpwdLoading(true)
            const p= await apis.post('dancife/forgetpwd',payload);
            if(p){
                const data = p.data;
                message.success('修改成功啦~')
                setCache(PHONE,data.phone)
                setCache(TOKEN,data.token)
                dispatch.home.set_userPhone(data.phone)
                dispatch.home.set_isShowForgetpwdForm(false)
            }
            dispatch.home.set_isShowForgetpwdLoading(false)
        },
        async getUserinfoAsync(payload: number, state){
            const p= await apis.post('dancife/getuserinfo',payload);
            if(p){
                const data = p.data;
                setCache(DEFAULT_YB,data.fy)
            }
        },
        async updatenowstudyAsync(payload: IUpdatenowstudy, state){
            const p= await apis.post('dancife/updatenowstudy',payload);
            if(p){
                const data = p.data;
                if(payload.cb){
                    payload.cb()
                }
            }
        },

    }),
})


interface IUpdatenowstudy{
    book_id:number,
    cb:any
}

interface LoginData{
    phone:string,
    password:string,
    cb:any
}
interface RegisterData{
    phone:string,
    password:string,
    code:string,
}

interface ForgetpwdData{
    phone:string,
    password:string,
    code:string,
}
export interface HomeInitialState {
    isShowLoginForm:boolean;
    isShowLoginLoading:boolean;
    isShowRegisterForm:boolean
    isShowRegisterLoading:boolean;
    userPhone:string;
    isShowForgetpwdForm:boolean
    isShowForgetpwdLoading:boolean;
    selectedSubNavId:number,
    nowFinishCount:number
}