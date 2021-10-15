import React, {useState} from "react";
import './index.less'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@/store";
import {ActionType} from "@/store/home/home";

const SubNav = () => {

    const {selectedSubNavId} = useSelector((state:IRootState) => {
        const s = state.home
        return {
            selectedSubNavId:s.selectedSubNavId,
        }
    });
    const dispatch = useDispatch();

    const [navlist,setNavlist]=useState([
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
    <div className={'subnav-wrap'}>
        <ul>
            {
                navlist.map((item)=>{
                    return (
                        <li  className={`${selectedSubNavId==item.id?'active':''}`}
                            onClick={()=>{
                                dispatch({
                                    type: ActionType.HomeSetNavId,
                                    payload: item.id,
                                });
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
