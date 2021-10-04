import React, { useEffect, useState } from "react";
import './index.less'
import {debounce, isReachBottom} from "@/utils/CommonUtils";
import {ActionType} from "@/store/newlist/newslist";

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
    <div className={`gotop-wrap ${show?'':'hide'}`} onClick={()=>{
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
