import React, {useEffect, useState} from "react";
import css from "@/views/tcdetail/index.module.less";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/rematch";
import {useParams} from "react-router-dom";
import LeftBox from "@/views/tcdetail/components/leftbox/Index";
import RightBox from "@/views/tcdetail/components/rightbox/Index";

type  Param = {
    article_id:string,
}


const Tcdetail = () => {
  const {article_id} = useParams<Param>() ;

  const dispatch = useDispatch<Dispatch>();
  const [yb,setYb] = useState('');

  useEffect(()=>{
      dispatch.study.getOneArticleAsync(article_id);
  },[])

  return (
    <div className={`${css.tc_detail_wrap}`}>
        <LeftBox/>
        <RightBox article_id={article_id}/>
    </div>
  );
};

export default Tcdetail;
