import React, {useEffect} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {message, Popover, Tooltip} from 'antd';

import {Study_type} from "@/const/const";
import {IWordItem} from "@/rematch/models/bookwords";
import PlayIcon from "@/components/playicon/Index";
import {getDefaultPlayPhontic} from "@/utils/CommonUtils";
import MyPagination from "@/components/pagination/Index";
import MyEmpty from "@/components/empty/Index";

interface D{
    book_id:number
}


const BooksWordsRight= (props:D) => {
    const {book_id} = props
    const {leftId,pageNum,list,count,pageSize} = useSelector((state:RootState) => {
        const s = state.bookwords
        return {
            list:s.list,
            count:s.count,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
            leftId:s.leftId
        }
    });

    const dispatch = useDispatch<Dispatch>();
    useEffect(()=>{
        dispatch.bookwords.getStudyWordListAsync({
            book_id:book_id,
            isPage:true,
            pageNum:pageNum,
            pageSize:pageSize,
            type:Study_type.UNSTUDY_WORD
        })
    },[])

    return (
        <div style={{width:'100%',marginLeft:'20px'}}>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'15px',fontSize:'16px'}}>
                {list[0] && list[0].book_name}(一共{count}个词汇)
            </div>
            <MyEmpty isShow={list.length==0} text={'暂无数据'}/>
            <div className={`${css.bookwords_right} `}>
                {
                    list.map((item:IWordItem)=>{
                        return (
                            <div key={item.id} style={{borderBottom:"1px solid #ccc",paddingBottom:'15px',marginRight:'30px'}}>
                                <div className={`${css.bookwords_right_top}`}>
                                    <div >
                                        <div>
                                            <span style={{fontWeight:'bold'}}>{item.e_word} </span>
                                            <span style={{fontSize:"14px"}}> {item.en_yb}</span>

                                        </div>
                                        <div style={{marginTop:"5px",fontSize:'14px'}}>
                                            {/*<Tooltip placement="right" title={`该单词的复习正确率为${item.right_percent}%`} >*/}
                                            {/*    {item.right_percent}%*/}
                                            {/*</Tooltip>*/}
                                            <Tooltip placement="right" title={`点我收藏`} >
                                                <i style={{cursor:'pointer',marginLeft:"10px"}} className={`iconfont ${item.is_collected==1?'red':''}`}  onClick={()=>{
                                                    const m =   item.is_collected==1?0:1
                                                    dispatch.study.updateuserwordcollected({
                                                          book_id:book_id,
                                                          e_word:item.e_word,
                                                          is_collected:m
                                                    })
                                                    if(m==1){
                                                        message.success("收藏成功")
                                                    }
                                                    if(m==0){
                                                        message.error("取消收藏")
                                                    }
                                                    const l = [...list]
                                                    l.forEach(item4=>{
                                                        if(item4.e_word==item.e_word){
                                                            item4.is_collected = m
                                                        }
                                                    })
                                                    dispatch.bookwords.set_list(l)

                                                }}>&#xe612;</i>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div style={{color:'green'}}>
                                        <PlayIcon showtips={false} e_word={item.e_word} type={getDefaultPlayPhontic()} playNow={false}/>
                                    </div>
                                </div>
                                <div className={`${css.bookwords_right_bottom}`} style={{cursor:'pointer'}}>

                                    <Popover content={(<div>
                                        <p style={{fontSize:'20px'}}>{item.e_word} {item.en_yb}</p>
                                        {
                                            item.c_word_list.map(item3=>{
                                                return (
                                                    <p style={{fontSize:'20px'}} key={item3.value}>{item3.value}</p>
                                                )
                                            })
                                        }
                                    </div>)} title="单词解释">
                                        {item.c_word_list[0].value}
                                    </Popover>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{display:'flex',justifyContent:'flex-end'}}>
                <MyPagination total={count} callback={()=>{
                    const c = pageNum+1
                    dispatch.bookwords.set_pageNum(c)
                    dispatch.bookwords.getStudyWordListAsync({
                        book_id:book_id,
                        isPage:true,
                        pageNum:c,
                        pageSize:pageSize,
                        type:leftId
                    })
                }} currentPage={pageNum} pageSize={pageSize}/>
            </div>
        </div>
  );
}

export default BooksWordsRight;
