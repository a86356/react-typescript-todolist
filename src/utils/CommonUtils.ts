import {getCache} from "@/utils/CacheUtils";
import {DEFAULT_YB} from '@/const/const'

export const isReachBottom=(successcallback:any,failcallback?:any)=>{

    if (getScrollTop()+getWindowHeight()+50>getScrollHeight()){
        successcallback()
    }else{
        if(failcallback){
            failcallback()
        }
    }


}

export const debounce=(fn:any,wait:number)=>{
    let timer:any = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }

        timer = setTimeout(fn,wait);
    }
}

const getWindowHeight = () => {
    let windowHeight = 0;
    if(document.compatMode === "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }

    return windowHeight;

}

const getScrollTop = () => {
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }

    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
const getScrollHeight = () => {
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}

/*
* 第四个记忆周期是 1天
第五个记忆周期是 2天
第六个记忆周期是 4天
第七个记忆周期是 7天
第八个记忆周期是15天
*
* */
export const calstudyprogress=(bookwordslist:any,planstudyday:number)=>{

    const wordsnumber = bookwordslist.length;
    //每天学习的个数
    const day_study_num = Math.ceil(wordsnumber/planstudyday)
    //加上复习的天数
    const totalStudyday =day_study_num+15;
    const tmp=[];

    for (let i=1;i<=totalStudyday;i++){
        tmp[i]={firstStudy:[],review:[]};
    }
}

export const daynewwords=()=>{
    const list=[];
    for (let i=10;i<=200;){
        list.push({number:i});
        i=i+10;
    }
    return list
}


export const getRandomNum=(n:number)=>{
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for(let i = 0; i < n; i++) {
        const id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

export const getDefaultPlayPhontic=()=>{
    const yb = getCache(DEFAULT_YB)
    if(yb){
        return yb;
    }
    return 'en';
}

export const hidePhone=(cellValue:string)=>{
    if (Number(cellValue) && String(cellValue).length === 11) {
        const mobile = String(cellValue)
        const reg = /^(\d{3})\d{4}(\d{4})$/
        return mobile.replace(reg, '$1****$2')
    } else {
        return cellValue
    }
}
