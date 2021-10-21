import React, {useEffect} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {Study_type} from "@/const/const";


interface D{
    book_id:number
    study_type:number
}
const BooksWordsLeft= (props:D) => {
    const {book_id,study_type} = props
    const {leftId,pageNum,list,count,pageSize} = useSelector((state:RootState) => {
        const s = state.bookwords
        return {
            list:s.list,
            count:s.count,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
            leftId:s.leftId,
        }
    });

    const dispatch = useDispatch<Dispatch>();

    useEffect(()=>{
        dispatch.bookwords.set_leftId(study_type)
    },[])

    const press=  (number:number)=>{
        dispatch.bookwords.set_leftId(number)

        dispatch.bookwords.set_pageNum(1)
        dispatch.bookwords.getStudyWordListAsync({
            book_id:book_id,
            isPage:true,
            pageNum:1,
            pageSize:pageSize,
            type:number
        })
    }
    return (
        <div className={`${css.bookwords_left}`}>
            <ul>
                <li className={`${css.left_time} ${leftId==Study_type.UNSTUDY_WORD?css.active:''}`} onClick={()=>{press(Study_type.UNSTUDY_WORD)}}>学习新词</li>
                <li className={`${css.left_time} ${leftId==Study_type.REVIEW_WORD?css.active:''}`} onClick={()=>{press(Study_type.REVIEW_WORD)}}>复习单词</li>
                <li className={`${css.left_time} ${leftId==Study_type.COLLECTED_WORD?css.active:''}`} onClick={()=>{press(Study_type.COLLECTED_WORD)}}>收藏单词</li>
                <li className={`${css.left_time} ${leftId==Study_type.WORD_WRONG?css.active:''}`} onClick={()=>{press(Study_type.WORD_WRONG)}}>错误单词</li>
                <li className={`${css.left_time} ${leftId==Study_type.ALL_WORD?css.active:''}`}  onClick={()=>{press(Study_type.ALL_WORD)}}>所有单词</li>
            </ul>
        </div>
  );
};

export default BooksWordsLeft;
