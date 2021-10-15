import React, {useEffect} from "react";
import css from './index.module.less'

import Yb from './components/yb/Index'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import ResultPage from "@/views/detaillisten/components/resultpage/Index";
import EWord from "@/views/detaillisten/components/eword/Index";
import SubmitBtns from "@/views/detaillisten/components/submitbtns/Index";
import CWord from "@/views/detaillisten/components/cword/Index";
import Pic from "@/views/detaillisten/components/pic/Index";
import WordGroup from "@/views/detaillisten/components/wordgroup/Index";
import {Card} from 'antd'
import Studyprogress from "@/views/detaillisten/components/studyprogress/Index";

const Detaillisten= () => {
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

    useEffect(()=>{
        dispatch.study.getTodayStudyAsync({
            book_id:book_id,
            pageNum:pageNum,
            pageSize:pageSize,
            type:1,
            isPage:false
        })
    },[])



    return (
        <div className={`bodycontainer ${css.wrap} por`} >
            <div className={`${todayStudyCurrentIndex>=todayStudyCount?'hide':''}`}>
                <EWord e_word={current.e_word} is_collected={current.is_collected}/>
                <Yb en_yb={current.en_yb} uk_yb={current.uk_yb} e_word={current.e_word}/>
                <CWord/>
                <Pic/>
                <WordGroup/>
                <SubmitBtns/>

            </div>
            <div className="result">
                <ResultPage title={'恭喜你完成今天的任务拉~~'} subtitle={``} isShow={todayStudyCurrentIndex>=todayStudyCount &&todayStudyCurrentIndex>0}/>
            </div>
            <Studyprogress book_id={book_id}/>

        </div>

    );



};

export default Detaillisten;
