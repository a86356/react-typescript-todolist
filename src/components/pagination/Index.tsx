import React, {useEffect} from "react";
import css from './index.module.less'
import {Button, Pagination} from "antd";
import {COLLECTION} from "@/const/const";

const MyPagination = (props:Data) => {
    const itemRender=(current:any, type:string, originalElement:any) =>{
        if (type === 'prev') {
            return <Button id={'before_btn'} type={'link'}>前一页</Button>;
        }
        if (type === 'next') {
            return <Button id={'next_btn'} type={'link'}>后一页</Button>;
        }
        return originalElement;
    }

    const {total,pageSize,currentPage} = props;

    const cb = props.callback
    return (
        <div className={`${css.pagewrap} ${total>0?'':'hide'}`} >
            <Pagination onChange={(page)=>{
                if(cb){
                    cb(page)
                }
            }}  total={total} itemRender={itemRender} pageSize={pageSize} showSizeChanger={false}
                        defaultCurrent={currentPage}
            />
        </div>
);
};

interface Data{
    total:number;
    callback:any;
    currentPage:number,
    pageSize:number
}

export default MyPagination;
