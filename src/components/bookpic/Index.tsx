import React from "react";
import {Tooltip} from 'antd';
import css from './index.module.less'

interface Data{
    bookName:string;
    pic?:string
}

const BookPic = (p:Data) => {
  return (
    <Tooltip placement="right" title={p.bookName}>
        <div className={`${css.bookpic}`} >
            <img style={{width:"140px",height:"200px"}} src={p.pic} alt={p.bookName}/>
        </div>
    </Tooltip>
  );
};

export default BookPic;
