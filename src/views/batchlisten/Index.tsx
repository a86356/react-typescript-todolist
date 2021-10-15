import React, {useEffect} from "react";
import css from './index.module.less'
import {Input, Popover, Tag, Tooltip} from 'antd';

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {CheckCircleOutlined, CloseCircleOutlined,} from '@ant-design/icons';
import Studyprogress from "@/views/batchlisten/components/studyprogress/Index";
import {getDefaultPlayPhontic} from "@/utils/CommonUtils";
import {isEmpty} from "@/utils/ValidateUtils";
import MyPagination from "@/components/pagination/Index";
import BatchList from "@/views/batchlisten/components/list/Index";
import Loading from "@/components/loading/Index";

const BatchListen= () => {
    const dispatch = useDispatch<Dispatch>();
    const {isLoading,pageSize,pageNum,todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
            isLoading:s.isLoading
        }
    });
    const book_id=4

    useEffect(()=>{
        dispatch.study.set_pageSize(20)
        dispatch.study.getTodayStudyAsync({
            book_id:book_id,
            pageNum:pageNum,
            pageSize:pageSize,
            type:1,
            isPage:true
        })
    },[pageSize])

    const play = (e_word:string)=>{
        if(!isEmpty(e_word)){
            const str1 = `https://dict.youdao.com/dictvoice?audio=${e_word}&type=${getDefaultPlayPhontic()=='en'?2:1}`
            const audio = new Audio(str1);
            setTimeout(()=>{
                audio.play();
            },100)
        }
    }

    return (
        <div className={`bodycontainer ${css.batch_wrap} ` } >

            <div className={`${css.left}`}>
                <Studyprogress book_id={4}/>
            </div>
            <BatchList book_id={book_id}/>
            <Loading isLoading={isLoading}/>
            <MyPagination total={todayStudyCount} callback={()=>{
                const m=  pageNum+1
                dispatch.study.set_pageNum(m)
                dispatch.study.getTodayStudyAsync({
                    book_id:book_id,
                    pageNum:m,
                    pageSize:pageSize,
                    type:1,
                    isPage:true
                })
            }} currentPage={pageNum} pageSize={pageSize}/>
        </div>
    );
}

export default BatchListen;
