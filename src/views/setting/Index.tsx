import React, {useEffect, useState} from "react";
import './index.module.less'
import css from "@/views/setting/index.module.less";
import { Form, Input, Button, Radio } from 'antd';
import {useDispatch} from "react-redux";
import {Dispatch} from "@/rematch";
import {getCache} from "@/utils/CacheUtils";
import {DEFAULT_YB} from "@/const/const";

const Setting = () => {

  const dispatch = useDispatch<Dispatch>();
  const [yb,setYb] = useState('');

  useEffect(()=>{
      dispatch.home.getUserinfoAsync(1);
      const cacheYb=getCache(DEFAULT_YB)
      if(cacheYb){
          setYb(cacheYb);
      }

  },[])

  return (
    <div className={`bodycontainer ${css.setting_wrap}`}>
        <div className={`${css.form}`}>
            <div className={`${css.form_item}`}>
                <div className={`${css.left}`}>发音方式</div>
                <div className={`${css.right}`}>
                    <Radio.Group value={yb} onChange={(e)=>{
                        const v=e.target.value
                        setYb(v)
                        dispatch.study.updateSettingAsync({
                            fy:v
                        })
                    }}>
                        <Radio value="en">美音</Radio>
                        <Radio value="uk">英音</Radio>
                    </Radio.Group>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Setting;
