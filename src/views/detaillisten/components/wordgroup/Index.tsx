import React from "react";
import css from './index.module.less'

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

const WordGroup= () => {
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
        <div className={`${css.groupwrap} ${current.wordgroup_list.length>0?'':'hide'}`}>
            <h2 className={`mb20`}>常用词组</h2>
            {
                current.wordgroup_list.map((item:any,index:number)=>{
                    return (
                        <div key={index} className={`${css.wordgroup_item}`} >
                            <span className={`${css.wordgroup_item_key} mr30 tar`}>{item.key}</span>
                            <span className={`${css.wordgroup_item_key} tal`}>{item.value}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default WordGroup;
