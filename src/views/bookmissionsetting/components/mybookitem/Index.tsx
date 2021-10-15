import React, {useEffect} from "react";
import css from './index.module.less'
import ProgressBar from "@/components/progressbar/Index";
import BookPic from "@/components/bookpic/Index";

interface D{
    id:number | string;
    book_name:string,
    total:number;
    hasfinished:number;
    pic:string;
    nowFinishTime:string
}


const MyBookItem= (props:D) => {
  const  {book_name,total,hasfinished,pic} =  props


  useEffect(()=>{

  },[])

    return (
      <>
          <div className={`${css.item} p20`}>
              <div className={`${css.l}`}>
                  <BookPic bookName={book_name} pic={pic}/>
              </div>
              <div className={`${css.r} ml20`} style={{width:'400px'}}>
                  <div className={`${css.t}`}>
                      <div className={`${css.title} lh30 mb10`}>
                          <h2 className={'fz20'}>{book_name}</h2>
                      </div>
                      <div className={`${css.finish_time}  tc2`}>
                          <span className={`${css.t}`}>预计完成时间：</span>
                          <span className={`${css.b}`}>2021年10月20日</span>
                      </div>
                      <div className={`${css.finished}  lh30 tc2`}>
                          已完成：{hasfinished}/{total}词
                      </div>
                      <div className={`${css.progressbarwrap}`}>
                          <ProgressBar total={total} hasfinished={hasfinished}/>
                      </div>
                  </div>
              </div>
          </div>
      </>

  );
};

export default MyBookItem;
