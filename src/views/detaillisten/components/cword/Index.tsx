import React from "react";
import css from './index.module.less'

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";


const CWord= () => {
    const dispatch = useDispatch<Dispatch>();
    const {todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex
        }
    });


    return (
        <div className={`${css.mean} `}>
            {
                current.c_word_list.map((item:any)=>{
                    return (
                        <div className={`${css.mean_item}`} key={item.id}>{item.value}</div>
                    )
                })
            }
        </div>

    );



};

export default CWord;
