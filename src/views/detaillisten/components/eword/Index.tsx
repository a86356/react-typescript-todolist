import React, {useEffect} from "react";
import css from './index.module.less'
import {message, Tooltip} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {COLLECTION} from "@/const/const";

interface D{
    e_word:string;
    is_collected:number
}


const EWord= (props:D) => {
    const {e_word} = props
    const {todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex
        }
    });
    const dispatch = useDispatch<Dispatch>();

    const updatecollected = ()=>{
        const m = current.is_collected==1?0:1
        dispatch.study.set_updatecurrentcollected(m)
        dispatch.study.updateuserwordcollected({
            book_id:current.book_id,
            is_collected:m,
            e_word:current.e_word
        })
        if(m==1){
            message.success("收藏成功")
        }
        if(m==0){
            message.error("取消收藏")
        }
    }

    const press=(e:KeyboardEvent)=>{
        if(e.keyCode==COLLECTION.keycode){
            updatecollected()
        }
    }

    useEffect(()=>{
        window.addEventListener('keypress',press,false)
        return ()=>{
            window.removeEventListener('keypress',press,false)
        }
    },[current.is_collected])

    return (
        <div className={`${css.e_word}`}>
            <Tooltip placement="top" title={`按键盘${COLLECTION.value}可收藏单词`}>
                <span>{e_word}</span>
            </Tooltip>
            <span>
                <i className={`iconfont ${css.e_word_collected} ${current.is_collected==1?css.active:''}`}
                    onClick={()=>{
                        updatecollected()
                    }}
                >&#xe612;</i>
            </span>
        </div>
    );



};

export default EWord;
