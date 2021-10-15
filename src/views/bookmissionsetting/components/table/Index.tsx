import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {getRandomNum} from "@/utils/CommonUtils";
import Loading from "@/components/loading/Index";
const Table= (props:Props) => {
    const {planStudyNum,studyScheduleList,isLoadingTable} = useSelector((state:RootState) => {
        const s = state.bookmissionsetting
        return {
            planStudyNum:s.planStudyNum,
            studyScheduleList:s.studyScheduleList,
            isLoadingTable:s.isLoadingTable
        }
    });
    const {book_id} = props
    const dispatch = useDispatch<Dispatch>();
    useEffect(()=>{
        dispatch.bookmissionsetting.getStudySchedule({
            book_id:book_id,
            plan_study_day:planStudyNum
        })
    },[])

    return (
        <>
            <Loading isLoading={isLoadingTable}/>
            <div className={`${css.hd} ${isLoadingTable?'hide':''}`}>
                <div className={`${css.hd_item}`}>
                    日期
                </div>
                <div className={`${css.hd_item}`}>
                    记忆
                </div>
                <div className={`${css.hd_item}`}>复习1</div>
                <div className={`${css.hd_item}`}>复习2</div>
                <div className={`${css.hd_item}`}>复习3</div>
                <div className={`${css.hd_item}`}>复习4</div>
                <div className={`${css.hd_item}`}>复习5</div>
            </div>
            <div className={`${css.bd} ${isLoadingTable?'hide':''}`}>
                {
                    studyScheduleList.map((item:any)=>{
                        return (
                            <div key={item.id} className={`${css.bd_line}`}>
                                <div className={`${css.bd_item}`}>Day{item.day}</div>
                                <div className={`${css.bd_item}`}>{item.first!=''?'List'+item.first:''}</div>
                                {
                                    item.review.map((item2:any,index:number)=>{
                                        return (
                                            <div className={`${css.bd_item}`}>{item2!=''?'List'+item2:''}</div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
  );
};

interface Props{
    book_id:number;
}

export default Table;
