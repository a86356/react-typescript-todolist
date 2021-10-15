import React, {useEffect, useState} from "react";
import css from './index.module.less'

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {NEXT_FAIL,NEXT_OK} from "@/const/const";
import {IWordItem} from "@/rematch/models/study";
import {Tooltip} from "antd";

const SubmitBtns= () => {
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
    const book_id=4

    const go_next=(result:number)=>{
        const c=todayStudyCurrentIndex
        const now:IWordItem = todayStudyList[c]
        console.log(now)
        dispatch.study.updatestudyprogress({
            book_id:now.book_id,
            result:result,
            e_word:now.e_word
        })
        dispatch.study.set_todayStudyCurrentIndex(c+1)
        dispatch.study.set_todayStudyCurrent(todayStudyList[c+1])

    }
    useEffect(()=>{
        //再加载一次
        dispatch.study.set_pageNum(pageNum+1)
        dispatch.study.getTodayStudyAsync({
            book_id:book_id,
            pageNum:pageNum,
            pageSize:pageSize,
            type:1,
            isPage:false
        })
    },[(todayStudyCurrentIndex+1)%5==0])

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
