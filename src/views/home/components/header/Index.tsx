import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {getCache} from "@/utils/CacheUtils";
import {isEmpty} from "@/utils/ValidateUtils";
import {Dispatch, RootState} from "@/rematch";
import css from './index.module.less'
import {hidePhone} from "@/utils/CommonUtils";
import { Modal, Button } from 'antd';
import {Router_type} from "@/const/const";

const Header = () => {
    const {phone} = useSelector((state:RootState) => {
        let phone = state.home.userPhone
        if(isEmpty(phone)){
            phone = getCache('phone')
        }
        phone = hidePhone(phone)
        return {
            phone:phone,

        }
    });

  const dispatch = useDispatch<Dispatch>();
  const [isShow,setIsShow] = useState<boolean>(false)
  const history = useHistory();

  return (
    <div className="container-wrap">
        <div className={`${css.header} h60 lh60 fz20`} style={{cursor:'pointer'}}>
            <div className={`${css.left}`} onClick={()=>{
                history.push({ pathname: Router_type.HOME_PATH, state: {} });
            }}>
                {/*<img  className={'w50 h50'} src="http://cdn.weixin1234.top/logo2.png" alt=""/>*/}
                {/*<h1>淘宝店/微信公众号 : 简一英语</h1>*/}
            </div>
            <div className={`${css.middle}`}>
                <h1>听写软件购买，微信：100000356</h1>
                {/*<a onClick={()=>{*/}
                {/*    setIsShow(true)*/}
                {/*}}>使用快捷键</a>*/}

            </div>
            <div className={`${css.right}`}>
                <div className={`${css.login} ${isEmpty(phone)?'':'hide'}`}>
                    <a className={'fz20 white'} onClick={()=>{
                        dispatch.home.set_isShowRegisterForm(true)
                    }}>注册 </a>
                    <a className={'fz20 white'}> / </a>
                    <a className={'fz20 white'} onClick={()=>{
                        dispatch.home.set_isShowLoginForm(true)
                    }}> 登陆</a>
                </div>
                <div className={ `${css.phonewrap} ${!isEmpty(phone)?'':'hide'}`}>
                    <div>
                        <span className={`${css.userphone} fz20`}>{phone}</span>
                        <i className={`${css.icon} iconfont`}>&#xe6cc;</i>
                    </div>
                    <div className={`${css.menu_container}`}>
                        <ul className={`${css.sub}`}>
                            <li onClick={()=>{
                                dispatch.home.set_logout()
                            }}>退出登陆</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Modal title="系统快捷键" visible={isShow} onOk={()=>{
            setIsShow(false)
        }} onCancel={()=>{
            setIsShow(false)
        }}>
            <p>键盘数字1,立即播放发音</p>
            <p>键盘数字2,认识单词,进入下一个单词</p>
            <p>键盘数字3,不认识单词,进入下一个单词</p>
            <p>键盘数字4,收藏该单词,方便复习</p>
            <p>需要其他快捷键功能的,请联系微信:100000356</p>
        </Modal>
    </div>
  );
};

export default Header;
