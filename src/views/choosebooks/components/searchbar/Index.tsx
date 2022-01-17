import React from "react";
import css from './index.module.less'
import {Button, Input, message, Tooltip} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "@/utils/ValidateUtils";
import {SHOPNAME} from "@/const/const";
import {Dispatch, RootState} from "@/rematch";
import {Auth_type} from "@/const/const";

const SearchBar= () => {

    const {categoryId,searchInputValue} = useSelector((state:RootState) => {
        const s = state.choosebook
        return {
            searchInputValue:s.searchInputValue,
            categoryId:s.categoryId
        }
    });
    const dispatch = useDispatch<Dispatch>();

    return (
        <div className={`${css.searchbar}`}>
            <div className={`${css.header_left}`}>
                <Tooltip placement="bottom" title={Auth_type.NO_AUDIO} >
                    <div className="flex">
                        <i className={'iconfont fz20'}>&#xe601;</i>
                        <div className={'ml10 lh20'}>添加自己的听力音频?</div>
                    </div>
                </Tooltip>
            </div>
            <Input className={`${css.ipt}`}
                   onKeyUp={(e)=>{
                       if(e.keyCode==13){
                           dispatch.choosebook.getBookListAsync({
                               pageNum:1,
                               pageSize:10,
                               book_name:searchInputValue
                           })
                       }

                       if(isEmpty(searchInputValue) && e.keyCode==8){
                           dispatch.choosebook.getBookListAsync({
                               pageNum:1,
                               pageSize:10,

                           })
                       }

                   }}
                   placeholder={"请输入要查找的单词书"} onChange={(e)=>{
                dispatch.choosebook.set_searchInputValue(e.target.value)

            }}
                   addonAfter={
                       <Tooltip title="点我搜索">
                           <Button type="link" onClick={()=>{
                               if(isEmpty(searchInputValue)){
                                   message.info("请输入搜索的内容")
                                   return
                               }

                               dispatch.choosebook.getBookListAsync({
                                   pageNum:1,
                                   pageSize:10,
                                   book_name:searchInputValue
                               })
                           }}>搜索</Button>
                       </Tooltip>
                   }
                   addonBefore={<SearchOutlined />}
            />
        </div>

  );
};

export default SearchBar;
