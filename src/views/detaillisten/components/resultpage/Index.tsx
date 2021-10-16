import React, {useEffect, useState} from "react";
import css from './index.module.less'


import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

import {IWordItem} from "@/rematch/models/study";
import { Result, Button } from 'antd';
import {useHistory} from "react-router-dom";
import {Router_type} from "@/const/const";

interface Data{
    isShow:boolean
    title:string
    subtitle:string
}
const ResultPage= (p:Data) => {
    const {isShow,title,subtitle} = p;
    const history = useHistory();

    return (
        <div className={isShow?'':'hide'}>
            <Result
                status="success"
                title={title}
                subTitle={subtitle}
                extra={[
                    <Button type="primary" key="console" onClick={()=>{
                        history.push({ pathname: Router_type.HOME_PATH, state: {  } });
                    }}>
                        返回首页
                    </Button>,
                    // <Button key="buy">Buy Again</Button>,
                ]}
            />
        </div>

    );

};

export default ResultPage;
