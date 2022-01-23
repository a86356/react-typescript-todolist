import React, {useEffect, useState} from "react";
import css from './index.module.less'

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {NEXT_FAIL,NEXT_OK} from "@/const/const";
import {IWordItem} from "@/rematch/models/study";
import {Tooltip} from "antd";


interface D{
    study_type:number
    book_id:number
}
const SubmitBtns= (props:D) => {
    const {study_type,book_id} = props
    const dispatch = useDispatch<Dispatch>();
    const {pageSize,pageNum,todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex,
            pageNum:s.pageNum,
            pageSize:s.pageSize
        }
    });

    const go_next=(result:number)=>{
        const now_idx=todayStudyCurrentIndex

        const now:IWordItem = todayStudyList[now_idx]
        console.log(now.e_word,now.num_id)

        const next= now_idx+1
        dispatch.study.set_todayStudyCurrentIndex(next)
        dispatch.study.set_todayStudyCurrent(todayStudyList[next])
        dispatch.study.set_pageNum(pageNum+1)
    }



    const press=(e:KeyboardEvent)=>{
        if(e.keyCode==NEXT_OK.keycode){ // 9
            go_next(1)
        }
        if(e.keyCode==NEXT_FAIL.keycode){ // 0
            go_next(2)
        }
    }

    useEffect(()=>{
        window.addEventListener('keypress',press,false)
        return ()=>{
            window.removeEventListener('keypress',press,false)
        }
    },[todayStudyCurrentIndex,todayStudyList])

    const s= `按键盘${NEXT_OK.value}表示认识,${NEXT_FAIL.value}表示不认识`;

    return (
        <div className={`${css.resultwrap} mt50`}>
            <Tooltip placement="top" title={s}>
                <div className={`${css.success} ${css.btn} mb10`} onClick={()=>{
                    go_next(1)
                }}>认识({todayStudyCurrentIndex+1}/{todayStudyCount})</div>
            </Tooltip>
            <Tooltip placement="bottom" title={s}>
                <div className={`${css.fail}  ${css.btn}`} onClick={()=>{
                    go_next(2)
                }}>不认识</div>
            </Tooltip>
        </div>
    );

};

export default SubmitBtns;
