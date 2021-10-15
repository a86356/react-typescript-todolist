import React, {useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

const SubNav = () => {

    const {selectedSubNavId} = useSelector((state:RootState) => {
        const s = state.home
        return {
            selectedSubNavId:s.selectedSubNavId,
        }
    });
    const dispatch = useDispatch<Dispatch>();

    const [navlist]=useState([
        {
            id:1,
            name:'单词学习'
        },
        {
            id:2,
            name:'单词书选择'
        },
        {
            id:3,
            name:'学习进度'
        },
        {
            id:4,
            name:'我的词汇'
        },
        {
            id:5,
            name:'设置'
        },
    ])

    return (
    <div className={`${css.subnav_wrap} h50`}>
        <ul>
            {
                navlist.map((item)=>{
                    return (
                        <li key={item.id}  className={`h50 lh50 ${selectedSubNavId===item.id?'active':''}`}
                            onClick={()=>{
                                dispatch.home.set_selectedSubNavId(item.id)
                            }}
                        >
                            {item.name}
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default SubNav;
