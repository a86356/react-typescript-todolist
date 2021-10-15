import React from "react";
import css from './index.module.less'
import {Spin} from "antd";

const Loading = (props:Data) => {

    return (
        <div className={`${css.loading} ${props.isLoading?'':'hide'}`}>
            <Spin  tip="简简正在努力地加载中...">
                {/*<Alert*/}
                {/*    message="简简正在努力地加载中..."*/}
                {/*    description={'Never give up'}*/}
                {/*    type="info"*/}
                {/*/>*/}
            </Spin>,
        </div>
);
};

interface Data{
    isLoading:boolean;
}

export default Loading;
