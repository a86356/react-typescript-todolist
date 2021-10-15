import React, {useEffect} from "react";
import css from './index.module.less'
import {Tooltip} from 'antd'
import {isEmpty} from "@/utils/ValidateUtils";
import {getDefaultPlayPhontic} from '@/utils/CommonUtils'
import {PLAY_NOW} from '@/const/const'

const PlayIcon = (props:Data) => {
    const {e_word,type,playNow,showtips} = props;
    const str = `https://dict.youdao.com/dictvoice?audio=${e_word}&type=${type=='en'?2:1}`

    useEffect(()=>{
        if (playNow){
            play(str)
        }
    },[e_word])
    const play = (str1:string)=>{
        if(!isEmpty(e_word)){
            const audio = new Audio(str1);
            setTimeout(()=>{
                audio.play();
            },100)
        }
    }


    useEffect(()=>{
        if(playNow){

            window.addEventListener('keydown',press,false)
            return ()=>{
                window.removeEventListener('keydown',press,false)
            }
        }
    },[e_word])

    const press=(e:KeyboardEvent)=>{
        if(e.keyCode==PLAY_NOW.keycode){
            const c= getDefaultPlayPhontic()=='en'?2:1
            const en_str = `https://dict.youdao.com/dictvoice?audio=${e_word}&type=`+c
            play(en_str)
        }
    }
    let tit=''
    if(showtips){
        tit=`按键盘数字${PLAY_NOW.value}播放语音`
    }

    return (
        <>
            <Tooltip placement="top" title={tit}>
                <i className={`iconfont ${css.icon}` }
                   onMouseEnter={()=>{
                       play(str)
                   }}
                >&#xe650;</i>
            </Tooltip>
        </>
    );
};

interface Data{
    e_word:string;
    type:string; //uk,en
    playNow:boolean;
    showtips:boolean
}

export default PlayIcon;
