import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState,ActionType,getNewListAsync } from "@/store/newlist/newslist";
import {IRootState} from "@/store";

import './newslist.less'

import {isReachBottom,debounce} from "@/utils/CommonUtils";
import {useHistory} from "react-router-dom";


const NewsList = () => {
  const [backpic,setBackpic] = useState<string>('http://ydschool-online.nos.netease.com/GaoZhongluan_2_215_state_1548148785614001356_state_LJY.png?');

  const {loading,list,pageNum,} = useSelector((state:IRootState) => {
    const s = state.searchbar
    return {
      matches:s.matches,
      list:s.list,
      pageNum:s.pageNum,
      loading:s.loading
    }
  });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    dispatch(getNewListAsync(pageNum))

  },[pageNum])

  useEffect(()=>{
    window.addEventListener('scroll',debounce(loadMore,200))
    return () => {
      window.removeEventListener('scroll',loadMore)
    }
  },[pageNum])

  const loadMore=()=>{
    isReachBottom(()=>{
      dispatch({
        type: ActionType.Newslistchangepage,
        payload: pageNum+1,
      });
    })
  }

  return (
      <ul  className="newslistwrap">

        {
          list.map((item,index)=>{
            return (
                <li className={'item'} key={index} onClick={()=>{
                  history.push({ pathname: "/detail", state: { e_word: item.e_word,c_word:item.c_word } });
                }}>
                  <div className="left">
                    <img  src={item.pics} alt=""/>
                  </div>
                  <div className="right">
                    <div className="line">{item.e_word}</div>
                    <div className="line">{item.c_word}</div>
                  </div>
                </li>
            )
          })
        }
        <div className={`loadingwrap ${loading?'':'hide'}`}>正在加载中...</div>
      </ul>
  );
}

export default NewsList;
