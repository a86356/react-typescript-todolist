import React, {useState, useRef, useEffect} from "react";
import './index.module.less'
import css from "@/views/tcdetail/components/audioplayer/index.module.less";
import {Button,Slider } from "antd";
import {create_duration} from '@/utils/DateUtils'
import {useSelector} from "react-redux";
import {RootState} from "@/rematch";

//https://www.cnblogs.com/leinov/p/3896772.html
//http://www.lucklnk.com/godaddy/details/aid/790350379

let audio:any =null

const AudioPlayer = () => {
    const [isPlaying,setIsPlaying] =useState(false)
    const [progress, setProgress] = useState(0);
    const [currentTimeMS, setCurrentTimeMS] = useState('00:00');
    const [showvolumn, setShowvolumn] = useState(false);
    const [playRate, setPlayRate] = useState('1');
    const [duration, setDuration] = useState('');


    const {audio_url} = useSelector((state:RootState) => {
        const s = state.study
        return {
            audio_url:s.audio_url
        }
    });

    const volumnChange=(value:number)=>{
        audio.volume = value/100
    }

    const progressChange=(value:number)=>{
        // setCurrentTime(value)
        // setCurrentTimeMS(create_duration(value.toString(),'1'))
        // setProgress(value*audio.duration/100)
        setCurrentTimeMS(create_duration(audio.currentTime.toString(),'1'))
        audio.currentTime =value*audio.duration/100
    }


    useEffect(()=>{
        audio=new Audio(audio_url)

        window.addEventListener('keydown',(event)=>{
            const code = event.code
            if(code=='F7'){
                if(audio.paused){
                    audio.play()
                    setIsPlaying(true)
                }
            }
            if(code=='F8'){
                if(audio.played){
                    audio.pause()
                    setIsPlaying(false)
                }
            }
        },false)
        audio.addEventListener("canplay", ()=>{
            setDuration(create_duration(audio.duration.toString(),'1'))
        },false)
        audio.addEventListener("timeupdate", (event:any)=>{
            startProgress()
        },false)

    },[audio_url])

    const startProgress=()=>{
        setProgress(audio.currentTime*100/audio.duration)
        setCurrentTimeMS(create_duration(audio.currentTime.toString(),'1'))
    }

    const changePlayRate=(value:any)=>{
        setPlayRate(value)
        audio.playbackRate = value
        startProgress()
    }


    return (
        <div className={`${css.leftbox}`}>
            <div className="playerbtn">
              <i className={`iconfont ${css.icon} ${css.notselect} ${isPlaying?'hide':''}`} onClick={()=>{
                  setIsPlaying(true)
                  audio.play()
              }}>&#xe87c;</i>
              <i className={`iconfont ${css.icon} ${css.notselect} ${isPlaying?'':'hide'}`} onClick={()=>{
                  setIsPlaying(false)
                  audio.pause()
              }}>&#xea81;</i>
            </div>

            <div className={`${css.barwrap}`}>
                <Slider defaultValue={0} value={progress} onChange={progressChange}/>
                <div className={`${css.barbottom}`}>
                    <div className="center">
                        {currentTimeMS}/{duration} (F7开始/F8暂停)
                    </div>
                    <div className={`${css.rate}`}>
                        <div className={`${playRate=='0.5'?css.active:''} ${css.rateitem}`} onClick={()=>{
                            changePlayRate(0.5)
                        }}>0.5x</div>
                        <div className={`${playRate=='1'?css.active:''} ${css.rateitem}`} onClick={()=>{
                            changePlayRate(1)
                        }}>1x</div>
                        <div className={`${playRate=='1.5'?css.active:''} ${css.rateitem}`} onClick={()=>{
                            changePlayRate(1.5)
                        }}>1.5x</div>
                        <div className={`${playRate=='2'?css.active:''} ${css.rateitem}`} onClick={()=>{
                            changePlayRate(2)
                        }}>2x</div>
                    </div>
                </div>

            </div>
            <div className={`${css.volumn}`} onMouseOver={()=>{
                setShowvolumn(true)
            }} onMouseLeave={()=>{
                setShowvolumn(false)
            }}>
                <i className={`iconfont ${css.volicon}`}>&#xe602;</i>
                <div className={`${css.sliderwrap} ${showvolumn?'':'hide'}`}>
                    <Slider vertical  defaultValue={50} onChange={volumnChange}   />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
