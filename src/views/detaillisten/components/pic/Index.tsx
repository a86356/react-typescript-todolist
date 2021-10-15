import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import BigPic from "@/components/bigpic/Index";

import {IWordItem} from "@/rematch/models/study";

const Pic= () => {
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
    const [showpic,setShowpic] = useState<boolean>(false)

    return (
        <div className={`${current.pics!=''?'':'hide'} por`}>
            <img style={{maxWidth:'100px'}} src={current.pics} alt="" onMouseEnter={()=>{
                setShowpic(true)
            }} onMouseOut={()=>{
                setShowpic(false)
            }} />
            <BigPic width={'300px'} height={'300px'} pic={current.pics} left={'200px'} top={'10px'} isshow={showpic}/>
        </div>

    );



};

export default Pic;
