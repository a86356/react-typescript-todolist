import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import './index.less'
import {useDispatch, useSelector} from "react-redux";
import {ActionType} from "@/store/home/home";
import {IRootState} from "@/store";
import {getCache} from "@/utils/CacheUtils";
import {isEmpty} from "@/utils/ValidateUtils";
const Header = () => {
    const {phone} = useSelector((state:IRootState) => {
        let phone = state.home.userPhone
        if(isEmpty(phone)){
            phone = getCache('phone')
        }
        return {
            phone:phone,
        }
    });
  const dispatch = useDispatch();

  return (
    <div className="container-wrap">
        <div className="h"></div>
        <div className={'header'}>
            <div className="logo">
                <img src="http://cdn.weixin1234.top/logo2.png" alt=""/>
                <h1>简一英语</h1>
            </div>
            <div className="middle">
                {/*<h1>购买速记单词软件,请搜索淘宝店铺:简一英语</h1>*/}
                <a>使用快捷键</a>
            </div>
            <div className="right">
                <div className={`login ${isEmpty(phone)?'':'hide'}`}>
                    <a className={'item'} onClick={()=>{
                        dispatch({
                            type: ActionType.HomeToggleRegisterForm,
                            payload: true,
                        });
                    }}>注册 </a>
                    <span> / </span>
                    <a className={'item'} onClick={()=>{
                        dispatch({
                            type: ActionType.HomeToggleLoginForm,
                            payload: true,
                        });
                    }}> 登陆</a>
                </div>
                <div className={ `phonewrap ${!isEmpty(phone)?'':'hide'}`}>
                    <div>
                        <span className={'userphone'}>{phone}</span>
                        <i className="icon iconfont">&#xe6cc;</i>
                    </div>
                    <div className="menu-container">
                        <ul className="sub">
                            <li onClick={()=>{
                                dispatch({
                                    type: ActionType.HomeLogout,
                                    payload: '',
                                });
                            }}>退出登陆</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Header;
