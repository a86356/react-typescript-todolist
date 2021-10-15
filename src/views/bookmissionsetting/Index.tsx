import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import MyBookItem from "@/views/bookmissionsetting/components/mybookitem/Index";
import Selector from "@/views/bookmissionsetting/components/selector/Index";
import Table from "@/views/bookmissionsetting/components/table/Index";
const BookMissionSetting= () => {
    const {nowTotalCount,nowTitle,nowPic,nowBookId,nowFinishTime,nowHasFinishedNum} = useSelector((state:RootState) => {
        const s = state.bookmissionsetting
        return {
            nowPic:s.nowPic,
            nowBookId:s.nowBookId,
            nowFinishTime:s.nowFinishTime,
            nowHasFinishedNum:s.nowHasFinishedNum,
            nowTitle:s.nowTitle,
            nowTotalCount:s.nowTotalCount
        }
    });
    const dispatch = useDispatch<Dispatch>();

    const book_id =4

    useEffect(()=>{
        dispatch.bookmissionsetting.set_nowBookId(book_id)
        dispatch.bookmissionsetting.getStudyBookAsync({
            book_id:book_id
        })

    },[])

    return (
       <div className={`bodycontainer p20`}>
            <div className={`${css.books_mission_setting} `} >
                <div className={`${css.left}`}>
                    <MyBookItem nowFinishTime={nowFinishTime} id={nowBookId} book_name={nowTitle} total={nowTotalCount} hasfinished={nowHasFinishedNum} pic={nowPic}/>
                </div>
                <div className={`${css.right}`}>
                    <Selector/>
                </div>
            </div>
            <div className={`${css.tablewrap}`}>
                <Table book_id={book_id} />
            </div>
       </div>
    );
};

export default BookMissionSetting;
