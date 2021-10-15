import axios from "./axios";
import {isPhone} from "@/utils/ValidateUtils";
import {message} from "antd";

export interface response{
  list:[];
  msg:[];
}

const api = {
  // get post put delete => restful api
  getwords: (pageNum:number) => {
    return axios.post("danci/gettest", {pageNum:pageNum});
  },
  post: (url:string,data:any) => {
    return axios.post(url, data);
  },
  senccode:(phone:string)=>{
    if(!isPhone(phone)){
      message.error('手机号格式错误~~~')
      return
    }
    return axios.post('common/sendcode',{phone:phone})
  }
};

export default api


