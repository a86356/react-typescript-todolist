import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {isReachBottom} from "@/utils/CommonUtils";

const GoTop = () => {
  const [show, setShow] = useState<boolean>(false);

    useEffect(()=>{
        window.addEventListener('scroll',loadMore)
        return () => {
            window.removeEventListener('scroll',loadMore)
        }
    },[])

    const loadMore=()=>{
        isReachBottom(()=>{
           setShow(true)
        },()=>{
            setShow(false)
        })
    }

  return (
    <div className={`${css.gotop_wrap} ${show?'':'hide'}`} onClick={()=>{
        const scrollToptimer = setInterval(function() {
            const top = document.body.scrollTop || document.documentElement.scrollTop;
            const speed = top / 30;
            document.documentElement.scrollTop -= speed;
            if (top == 0) {
                clearInterval(scrollToptimer);
            }
        }, 5);

    }}>
        ↑
    </div>
  );
};

export default GoTop;
