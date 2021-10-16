import React, {useEffect} from "react";
import css from './index.module.less'
import MyBookItem from "@/views/entry/components/mybookitem/Index";
import MyPagination from "@/components/pagination/Index";
import {useDispatch, useSelector} from "react-redux";
import MyEmpty from "@/components/empty/Index";
import {Dispatch, RootState} from "@/rematch";

const MyBookList= () => {
    const pageSize = 4;
    const {pageNum,list,count} = useSelector((state:RootState) => {
        const s = state.book
        return {
            list:s.studyBookList,
            count:s.studyBookListCount,
            pageNum:s.pageNum,
        }
    });
    const dispatch = useDispatch<Dispatch>();

    useEffect(()=>{
        dispatch.book.getMyBookListAsync({
            pageNum:pageNum,
            pageSize:pageSize
        })
    },[pageNum])

    return (
    <>
        <div className={`${css.mybooks}`}>
            <div className={`${css.title} mb20 mt20`}>
                <h1 className={'fz20 lh30'}>我的课本 (共{count}本)</h1>
                <div className={`${css.addbook} pl10 pr10 fz16 lh30`}>
                    <i className={'iconfont'}>&#xe655;</i>
                    <span >添加新书</span>
                    <i className={'iconfont'}>&#xe68c;</i>
                </div>
            </div>
            <div className={`${css.list}`}>
                {
                    list.map(item=>{
                        return (
                            <MyBookItem key={item.id} pic={item.pic} id={item.id} book_name={item.book_name} total={item.count} hasfinished={item.hasfinished}/>
                        )
                    })
                }
            </div>
        </div>
        <MyEmpty isShow={count==0}/>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
            <MyPagination currentPage={pageNum} total={count} pageSize={pageSize} callback={(page:number)=>{
                dispatch.book.getMyBookListAsync({
                    pageNum:page,
                    pageSize:pageSize,
                })
            }}/>
        </div>
    </>
  );
};

export default MyBookList;
