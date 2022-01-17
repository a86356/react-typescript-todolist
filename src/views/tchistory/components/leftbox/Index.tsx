import React, {useEffect, useState} from "react";
import './index.module.less'
import css from "@/views/tcdetail/components/leftbox/index.module.less";
import {Button,Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {IMytext} from "@/rematch/models/study";

const Leftbox = () => {
    const [showLayer,setShowLayer] =useState(true)
    const [visible, setVisible] = useState(false);
    const {origin_text,user_text_arr,orgin_text_arr} = useSelector((state:RootState) => {
        const s = state.study
        return {
            origin_text:s.origin_text,
            user_text_arr:s.user_text_arr,
            orgin_text_arr:s.orgin_text_arr,

        }
    });
    const dispatch = useDispatch<Dispatch>();

    const changeShow=(event:KeyboardEvent)=>{
        const code = event.code
        if(code=='F9'){
            setShowLayer(!showLayer)
        }
        dispatch.study.create_user_text_arr();
    }

    useEffect(()=>{
        window.addEventListener('keyup',changeShow,false)
        return ()=>{
            window.removeEventListener('keyup',changeShow,false)
        }
    },[showLayer])


  return (
    <div className={`${css.leftbox}`}>
        <Modal
            title="原文"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
        >
            <p>{origin_text}</p>
        </Modal>

        <div className={`${css.btns}`}>
            <Button type={'dashed'} onClick={()=>{
                setVisible(true)
            }}>原文</Button>
            <Button type={'dashed'} onClick={()=>{
                setShowLayer(!showLayer)
            }}>{showLayer?'显示批改':'遮住批改'}(F9切换)</Button>
        </div>
        <div className={`${css.bottom} `}>
            <div className={`${css.wordwrap}  ${!showLayer ?'':css.hide}`}>
                {
                    user_text_arr.map(item=>{
                        return (
                            <>
                                <div className={`${css.worditem} ${item.is_ok==1?css.is_right:'hide'}`}>{item.txt} &nbsp;</div>
                                <div className={`${css.worditem} ${item.is_ok==0?css.is_wrong:'hide'}`}>{item.txt} &nbsp;</div>
                                <div className={`${css.worditem} ${item.is_ok==0?css.is_fixed:'hide'}`}>{item.fixed_txt} &nbsp;</div>
                            </>
                        )
                    })
                }
            </div>

            <div className={`${css.layer} ${showLayer?'':css.hide}` } onClick={()=>{
                setShowLayer(false)
            }}>
               按键盘的F9切换哦~
            </div>
        </div>
    </div>
  );
};

export default Leftbox;
