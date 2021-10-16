import React, {useEffect} from "react";

import './index.module.less'
import ProgressBar from "@/components/progressbar/Index";
import BookPic from "@/components/bookpic/Index";
import {useDispatch, useSelector} from "react-redux";
import MyEmpty from "@/components/empty/Index";
import {Dispatch, RootState} from "@/rematch";
import css from './index.module.less'

const NowBook= () => {
    const {bookId,nowPic,nowTotalCount,nowTitle,loaded} = useSelector((state:RootState) => {
        const s = state.book
        return {
            bookId:s.nowBookId,
            nowPic:s.nowPic,
            nowTitle:s.nowTitle,
            nowTotalCount:s.nowTotalCount,
            loaded:s.isLoadedNowStudyBook
        }
    });
    const dispatch = useDispatch<Dispatch>();

    useEffect(()=>{
        dispatch.book.getNowStudyBookAsync(1)
    })

    return (
        <>
            <div className={`${css.nowbook}`}>
                <div className={`${css.top} mb20`}>
                    <h2 className={'fz20'}>正在学习的单词书</h2>
                    <div className={`${css.wordlisttip} pl10 pr10 fz16 lh30 ${bookId>0?'':'hide'}`}>
                        <i className={'iconfont'}>&#xe655;</i>
                        <span className={`${css.tit}`}>词表</span>
                        <i className={`iconfont ${css.icon_arrow}`}>&#xe68c;</i>
                    </div>
                </div>

                <div style={{height:'240px',width:'100%'}}>
                    <div className={`${css.bookitem} ${(loaded && bookId>0)?'':'hide'}`} >
                        <BookPic bookName={nowTitle} pic={nowPic}/>
                        <div className={`${css.right}`}>
                            <div className={`${css.title} lh30 mb10`}>
                                <h2 className={'fz20'}>{nowTitle}</h2>
                                <div className={`${css.setnums}`}>
                                    <i className={'iconfont'}>&#xe60f;</i>
                                    <span>设置任务量</span>
                                </div>
                            </div>

                            <div className={`${css.finish_time} lh30 tc2`}>
                                <span >预计完成时间：</span>
                                <span>2021年10月20日</span>
                            </div>
                            <div className={`${css.progressbarwrap}`}>
                                <div className={`${css.hasfinished} mb10 tc2`}>
                                    已完成: 12/{nowTotalCount}词
                                </div>
                                <ProgressBar total={nowTotalCount} hasfinished={1992}/>
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
