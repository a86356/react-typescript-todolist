import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InitialState,ActionType } from "@/store/newlist/newslist";
import {IRootState} from "@/store";
import Searchtips from "@/views/newlist/components/Searchtips";

import './searchbar.less'

const Searchbar = () => {
  const {inputValue,matches,list,selectedList} = useSelector((state:IRootState) => {
      const s = state.searchbar
      return {
          inputValue:s.inputValue,
          matches:s.matches,
          list:s.list,
          selectedList:s.selectedlist
      }
  });
  const dispatch = useDispatch();

  useEffect(()=>{
      const textInput:any   = document.getElementById('ipt');
      textInput.selectionStart=11
  },[])

  return (
    <div className="searchContainer" >
      <div className="inputwrap">
          <input id={'ipt'} value={inputValue} onKeyUp={(e)=>{
              //回车
              if(e.keyCode==13){
                  dispatch({
                      type: ActionType.NewslistSubmit,
                      payload: '',
                  });
              }
              //删除
              if(e.keyCode==8){
                  dispatch({
                      type: ActionType.NewslistChangeinput,
                      payload:inputValue,
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
      </div>
      <div className="inputlist">
          {
              selectedList.map((item,index)=>{
                  return (
                      <div className={'item'} key={index}>
                          <span className={'word'}>{item.e_word}</span>
                          <span className={'delete'} onClick={()=>{
                              dispatch({
                                  type: ActionType.Newslistdeleteitem,
                                  payload:item.e_word,
                              });
                          }}>x</span>
                      </div>
                  )
              })
          }
      </div>



      <Searchtips/>
    </div>
  );
}

export default Searchbar;
