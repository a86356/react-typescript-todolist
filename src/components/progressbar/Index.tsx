import React from "react";
import css from './index.module.less'

interface Data{
    total:number;
    hasfinished:number
}

const ProgressBar = (props:Data) => {
    const {total,hasfinished}  =props
  let percent = (hasfinished*100/total)
  percent = Math.floor(percent)
  if(total===0){
      percent=0
  }
  return (
      <div className={`${css.progressbar}`}>
          <div  className={`${css.content} ${percent>0?'':'hide'}`} style={{width:percent+'%'}}>
              {percent}%
          </div>
      </div>
  );
};

export default ProgressBar;
