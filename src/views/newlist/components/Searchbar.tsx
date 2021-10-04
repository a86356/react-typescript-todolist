import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitialState,ActionType } from "@/store/newlist/newslist";
import {IRootState} from "@/store";
import Searchtips from "@/views/newlist/components/Searchtips";

import './searchbar.less'

const Searchbar = () => {
  const {inputValue,matches,list} = useSelector((state:IRootState) => {
      const s = state.searchbar
      return {
          inputValue:s.inputValue,
          matches:s.matches,
          list:s.list
      }
  });
  const dispatch = useDispatch();

  return (
    <div className="searchContainer" >
      <input value={inputValue} onKeyDown={(e)=>{
          if(e.keyCode==13){
              dispatch({
                  type: ActionType.NewslistSubmit,
                  payload: '',
              });
          }
      }}  type="text" className={'search-input'} onChange={(e)=>{
         dispatch({
              type: ActionType.NewslistChangeinput,
              payload: e.target.value,
        });
      }} />
      <div className="searchbtn" onClick={()=>{
          dispatch({
              type: ActionType.NewslistSubmit,
              payload: '',
          });
      }}>搜索</div>
      <Searchtips/>
    </div>
  );
}

export default Searchbar;
