import React from "react";
import css from './index.module.less'
import {Empty} from "antd";

const MyEmpty = (props:Data) => {
    const {isShow,text} = props
    let d ='暂无内容哦...'
    if(text){
        d= text
    }

    return (
        <div className={`${css.empty} ${isShow?'':'hide'}`}>
            <Empty description={
                d
            }/>
        </div>
    );
};

interface Data{
    isShow:boolean;
    text?:string
}

export default MyEmpty;
