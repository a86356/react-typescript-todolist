import React, {useEffect} from "react";

import './index.module.less'
import ProgressBar from "@/components/progressbar/Index";
import BookPic from "@/components/bookpic/Index";
import {useDispatch, useSelector} from "react-redux";
import MyEmpty from "@/components/empty/Index";
import {Dispatch, RootState} from "@/rematch";
import css from './index.module.less'
import {useHistory} from "react-router-dom";
import {Router_type, Study_type,Study_way} from "@/const/const";
import {Button} from "antd";

const NowBook= () => {
    const {nowFinishNum,bookId,nowPic,nowTotalCount,nowTitle,loaded} = useSelector((state:RootState) => {
        const s = state.book
        return {
            bookId:s.nowBookId,
            nowPic:s.nowPic,
            nowTitle:s.nowTitle,
            nowTotalCount:s.nowTotalCount,
            loaded:s.isLoadedNowStudyBook,
            nowFinishNum:s.nowHasFinishedNum
        }
    });
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();

    useEffect(()=>{
        dispatch.book.getNowStudyBookAsync(1)
        dispatch.book.getstudynumAsync(0)

    },[])

    return (
        <>
            <div className={`${css.nowbook}`}>
                <div className={`${css.top} mb20`}>
                    <h2 className={'fz20'}>正在学习的单词书</h2>
                    <div style={{cursor:'pointer'}} className={`${css.wordlisttip} pl10 pr10  ${bookId>0?'':'hide'}`}
                        onClick={()=>{
                            history.push({pathname:Router_type.BOOK_WORDS+'/'+bookId })
                        }}
                    >
                        {/*<i className={'iconfont '} style={{marginRight:'5px'}}>&#xe655;</i>*/}
                        {/*<span>词表</span>*/}
                        {/*<i className={`iconfont`}>&#xe68c;</i>*/}
                    </div>
                </div>
                <div style={{width:'100%'}}>
                    <div className={`${css.bookitem} ${(loaded && bookId>0)?'':'hide'}`} >
                        <BookPic bookName={nowTitle} pic={nowPic}/>
                        <div className={`${css.right}`}>
                            <div className={`${css.title} lh30 mb10`}>
                                <h2 className={'fz20'}>{nowTitle}</h2>

                                <div className={`${css.setnums}`} onClick={()=>{
                                    history.push({pathname:Router_type.BOOK_MISSIONSETTING+'/'+bookId})
                                }}>
                                    <i className={'iconfont'}>&#xe60f;</i>

                                    <span>设置任务量</span>
                                </div>
                            </div>

                            {/*<div className={`${css.finish_time} lh30 tc2`}>*/}
                            {/*    <span >预计完成时间：</span>*/}
                            {/*    <span>2021年10月20日</span>*/}
                            {/*</div>*/}
                            {/*<div className={`${css.progressbarwrap}`}>*/}
                                <div className={`${css.hasfinished} mb10 tc2`}>
                                    已完成: {nowFinishNum}/{nowTotalCount}词
                                </div>
                            {/*    <ProgressBar total={nowTotalCount} hasfinished={1992}/>*/}
                            {/*</div>*/}

                            <div style={{marginBottom:'20px'}}>
                                <Button  className={`${css.my_btn}`} type={'primary'} onClick={()=>{
                                    history.push({pathname:Router_type.DETAIL_LISTEN+'/'+bookId+'/study_type/'+Study_way.FIRST_STUDY})
                                }}>详细学习</Button>
                                <Button className={`${css.my_btn}`}  type={'primary'}  onClick={()=>{
                                    history.push({pathname:Router_type.BATCH_LISTEN+'/'+bookId+'/study_type/'+Study_way.FIRST_STUDY})
                                }}>批量学习</Button>
                            </div>

                            <div style={{marginBottom:'20px'}}>
                                <Button className={`${css.my_btn}`} danger onClick={()=>{
                                    history.push({pathname:Router_type.DETAIL_LISTEN+'/'+bookId+'/study_type/'+Study_way.REVIEW_STUDY})
                                }}>详细复习</Button>
                                <Button className={`${css.my_btn}`} danger onClick={()=>{
                                    history.push({pathname:Router_type.BATCH_LISTEN+'/'+bookId+'/study_type/'+Study_way.REVIEW_STUDY})
                                }}>批量复习</Button>
                            </div>

                            <div>
                                <Button type={'primary'} onClick={()=>{
                                    history.push({pathname:Router_type.BOOK_WORDS+'/'+bookId+'/study_type/'+Study_type.UNSTUDY_WORD })
                                }}>查看我的单词表</Button>
                            </div>

                        </div>
                    </div>
                </div>
                <MyEmpty isShow={(loaded && bookId===0)} text={"没有在学习的单词书哦~"} />
            </div>
        </>
    );
};

export default NowBook;
