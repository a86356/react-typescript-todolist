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
