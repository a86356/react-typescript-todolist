import React from "react";
import css from './index.module.less'

interface Data{
    pic:string;
    left:string;
    top:string;
    isshow:boolean;
    width:string;
    height:string;
}

const BigPic = (props:Data) => {
      const {pic,left,top,isshow,width,height}  =props

      return (
          <div className={`poa ${isshow?'':'hide'}`} style={{left:left,top:top}}>
              <img style={{width:width,height:height}} src={pic} alt=""/>
          </div>
      );
};

export default BigPic;
