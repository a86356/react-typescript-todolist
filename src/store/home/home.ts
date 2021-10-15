import {  Reducer } from "redux";
import {message} from "antd";
import {isEmpty} from "@/utils/ValidateUtils";
import {clearCache} from "@/utils/CacheUtils";

export interface HomeInitialState {
    isShowLoginForm:boolean;
    isShowLoginLoading:boolean;
    isShowRegisterForm:boolean
    isShowRegisterLoading:boolean;
    userPhone:string;
    isShowForgetpwdForm:boolean
    isShowForgetpwdLoading:boolean;
    selectedSubNavId:number
}

export const initialState: HomeInitialState = {
    isShowLoginForm:false,
    isShowLoginLoading:false,
    isShowRegisterForm:false,
    isShowRegisterLoading:false,
    userPhone:'',
    isShowForgetpwdForm:false,
    isShowForgetpwdLoading:false,
    selectedSubNavId:1
};

export enum ActionType {
    HomeToggleLoginForm=50,
    HomeToggleLoginLoading=51,
    HomeLoginSubmit=52,
    HomeToggleRegisterForm=53,
    HomeToggleRegisterLoading=54,
    HomeSetUserPhone=55,
    HomeToggleForgetpwdForm=56,
    HomeToggleForgetpwdLoading=56,
    HomeLogout=57,
    HomeSetNavId=58
}


export const home: Reducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === ActionType.HomeToggleLoginForm) {
        return {
            ...state,
            isShowLoginForm:payload
        }
    }
    if (type === ActionType.HomeToggleLoginLoading) {
        return {
            ...state,
            isShowLoginLoading:payload
        }
    }
    if (type === ActionType.HomeLoginSubmit) {
        const formdata = payload
        if(isEmpty(formdata.phone)){
            message.error('请输入用户名');
            return
        }
        if(isEmpty(formdata.password)){
            message.error('请输入密码');
            return
        }

        return {
            ...state,
            isShowLoginLoading:payload
        }
    }
    if (type === ActionType.HomeToggleRegisterForm) {
        return {
            ...state,
            isShowRegisterForm:payload
        }
    }
    if (type === ActionType.HomeToggleRegisterLoading) {
        return {
            ...state,
            HomeToggleRegisterLoading:payload
        }
    }
    if (type === ActionType.HomeSetUserPhone) {
        return {
            ...state,
            userPhone:payload
        }
    }

    if (type === ActionType.HomeToggleForgetpwdForm) {
        return {
            ...state,
            isShowForgetpwdForm:payload
        }
    }

    if (type === ActionType.HomeToggleForgetpwdLoading) {
        return {
            ...state,
            isShowForgetpwdLoading:payload
        }
    }

    if (type === ActionType.HomeLogout) {
        clearCache('phone')
        clearCache('token')
        return {
            ...state,
            userPhone:''
        }
    }
    if (type === ActionType.HomeSetNavId) {
        return {
            ...state,
            selectedSubNavId:payload
        }
    }


    return state;
};
