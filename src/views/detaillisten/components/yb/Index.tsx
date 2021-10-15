import React from "react";
import PlayIcon from "@/components/playicon/Index";
import css from './index.module.less'
import {getDefaultPlayPhontic} from '@/utils/CommonUtils'
interface Props{
    e_word:string
    en_yb:string
    uk_yb:string
}
const Yb= (p:Props) => {
    const {e_word,en_yb,uk_yb} =p;

    return (
        <div className={`${css.voice}`}>
            <div className={`${css.voice_item}`}>
                <div className={`${css.yb}`}>
                    <span>英音</span>
                    <span>{uk_yb}</span>
                </div>
                <div style={{marginTop:'4px'}}>
                    <PlayIcon showtips={true} type={"uk"} e_word={e_word} playNow={getDefaultPlayPhontic() == 'uk'}  />
                </div>
            </div>
            <div className={`${css.voice_item}`}>
                <div className={`${css.yb}`}>
                    <span>美音</span>
                    <span>{en_yb}</span>
                </div>
                <div style={{marginTop:'4px'}}>
                    <PlayIcon showtips={true} type={"en"} e_word={e_word} playNow={getDefaultPlayPhontic() == 'en'} />
                </div>
            </div>
        </div>
    );
};

export default Yb;
