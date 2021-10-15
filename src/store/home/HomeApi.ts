import apis from "@/api/apis";
import {ActionType} from "@/store/home/home";
import {message} from "antd";
import {setCache} from "@/utils/CacheUtils";

export const loginAsync=(data:any)=>{
    return (dispatch:any)=>{
        dispatch({
            type: ActionType.HomeToggleLoginLoading,
            payload: true,
        });
        apis.post('dancife/login',data).then((res:any)=>{
            if(res){
                const data =res.data;
                message.success('登陆成功了呀~')
                setCache('phone',data.phone)
                setCache('token',data.token)
                dispatch({
                    type: ActionType.HomeSetUserPhone,
                    payload: data.phone,
                });
                dispatch({
                    type: ActionType.HomeToggleLoginForm,
                    payload: false,
                });
            }
            dispatch({
                type: ActionType.HomeToggleLoginLoading,
                payload: false,
            });
        })
    }
}

export const registerAsync=(data:any)=>{
    return (dispatch:any)=>{
        dispatch({
            type: ActionType.HomeToggleRegisterLoading,
            payload: true,
        });
        apis.post('dancife/register',data).then((res:any)=>{
            if(res){
                const data =res.data;
                message.success('注册成功~~')
                setCache('phone',data.phone)
                setCache('token',data.token)
                dispatch({
                    type: ActionType.HomeSetUserPhone,
                    payload: data.phone,
                });
                dispatch({
                    type: ActionType.HomeToggleRegisterForm,
                    payload: false,
                });
            }
            dispatch({
                type: ActionType.HomeToggleRegisterLoading,
                payload: false,
            });
        })
    }
}



export const fotgetpwdAsync=(data:any)=>{
    return (dispatch:any)=>{
        dispatch({
            type: ActionType.HomeToggleForgetpwdLoading,
            payload: true,
        });
        apis.post('dancife/forgetpwd',data).then((res:any)=>{
            if(res){
                const data =res.data;
                message.success(data.msg)
                setCache('phone',data.phone)
                setCache('token',data.token)
                dispatch({
                    type: ActionType.HomeSetUserPhone,
                    payload: data.phone,
                });
                dispatch({
                    type: ActionType.HomeToggleForgetpwdForm,
                    payload: false,
                });
            }
            dispatch({
                type: ActionType.HomeToggleForgetpwdLoading,
                payload: false,
            });
        })
    }
}