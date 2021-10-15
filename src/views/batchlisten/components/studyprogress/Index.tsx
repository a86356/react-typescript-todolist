import React, {useEffect} from "react";
import {Card} from 'antd'

import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
interface  P{
    book_id:number;
}

const Studyprogress= (data:P) => {
    const {book_id} = data

    const dispatch = useDispatch<Dispatch>();
    const {todayReviewNum,todayStudyNum,pageSize,pageNum,todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
            todayStudyNum:s.todayStudyNum,
            todayReviewNum:s.todayReviewNum
        }
    });
   useEffect(()=>{
       dispatch.study.getuserstudytodaybase({
           book_id:book_id
       })
   },[pageNum,current])

    return (
        <div className={`${css.progress_wrap}`}>
            <Card title="学习进度"  style={{ width: 300 }}>
                <p>课本:{current.book_name}</p>
                <p className={`${css.red}`}>今日学习新单词数:{todayStudyNum}</p>
                <p className={`${css.green}`}>今日复习单词数:{todayReviewNum}</p>
                <p className={`${css.green}`}>剩余新单词数:{todayStudyCount}</p>
            </Card>
        </div>
    );
};

export default Studyprogress;
