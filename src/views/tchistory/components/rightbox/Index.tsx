import React, {useEffect} from "react";
import './index.module.less'
import css from "@/views/tcdetail/components/rightbox/index.module.less";
import { Input, Space, Button, Switch } from 'antd';

import AudioPlayer from "@/views/tcdetail/components/audioplayer/Index";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import TextArea from "antd/lib/input/TextArea";
type IParam = {
    article_id:string
}
let timer:any = null
const Rightbox = (param:IParam) => {
    const dispatch = useDispatch<Dispatch>();
    const article_id =param.article_id
    useEffect(()=>{
        dispatch.study.getuserarticlAsync({
            article_id:article_id
        });
        dispatch.study.set_user_text("123");
    },[])
    const {user_text} = useSelector((state:RootState) => {
        const s = state.study
        return {
            user_text:s.user_text,

        }
    });

    useEffect(()=>{
        dispatch.study.create_user_text_arr();
    },[user_text])


    return (
      <div className={`${css.rightbox}`}>
          <div className={`${css.box}`}>

              <textarea
                  defaultValue={user_text}
                  className={`${css.textarea}`} name="" id="textarea"  onChange={(event)=>{
                  const cnt= event.target.value

                  dispatch.study.set_user_text(cnt);
                  dispatch.study.create_user_text_arr();

                  clearTimeout(timer)
                  timer= setTimeout(()=>{
                      dispatch.study.updateuserarticle({
                          article_id:article_id,
                          mytext:cnt
                      });
                      clearTimeout(timer)
                  },1000)
              }}/>

          </div>
          <div className={`${css.audiobar}`}>
              <AudioPlayer/>
          </div>
      </div>
  );
};

export default Rightbox;
