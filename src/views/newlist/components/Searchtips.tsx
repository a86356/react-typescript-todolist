import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "@/store/newlist/newslist";
import {IRootState} from "@/store";

import './searchtips.less'

const Searchtips = () => {
  const {matches,showSearchBox} = useSelector((state:IRootState) => {
      const s = state.searchbar
      return {
          matches:s.matches,
          showSearchBox:s.showSearchBox
      }
  });

  const dispatch = useDispatch();

  return (
    <div>
      <ul className={`searchtipbox ${matches.length>0?'':'hide'} ${showSearchBox?'':"hide"}`}>
          {
              matches.map((item,index)=>{
                  return (
                      <li className={'item'}  key={item.id}>
                          <div data-word={item.e_word} className={'word'} onClick={(e)=>{
                              const value = e.currentTarget.getAttribute('data-word')
                              if(value){
                                  dispatch({
                                      type: ActionType.Newslistselectitem,
                                      payload: value,
                                  })
                              }
                          }} >{item.e_word}{item.c_word}</div>

                          <div className={'close'} onClick={()=>{
                              dispatch({
                                  type: ActionType.NewslistToggleSearchBox,
                                  payload: false,
                              })
                          }}>x</div>
                      </li>
                  )
              })
          }
      </ul>
    </div>
  );
}

export default Searchtips;
