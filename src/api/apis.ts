import axios from "./axios";

export interface response{
  list:[];
  msg:[];
}

const api = {
  // get post put delete => restful api
  getwords: (pageNum:number) => {
    return axios.post("danci/gettest", {pageNum:pageNum});
  },

};

export default api


