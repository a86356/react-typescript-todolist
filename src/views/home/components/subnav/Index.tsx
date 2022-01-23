import React, {useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {Router_type, SubNav_type} from "@/const/const";
import { useHistory } from "react-router-dom";
import {RadiusUpleftOutlined} from "@ant-design/icons";
import * as path from "path";


const SubNav = () => {

    const {selectedSubNavId} = useSelector((state:RootState) => {
        const s = state.home
        return {
            selectedSubNavId:s.selectedSubNavId,
        }
    });
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();

    const [navlist]=useState([
        {id:SubNav_type.WORD_STUDY, name:'听写',path:Router_type.HOME_PATH},
        // {id:SubNav_type.WORD_BOOK_SELECT, name:'单词书选择'},
        {id:SubNav_type.STUDY_PROGRESS, name:'已完成',path:Router_type.STUDY_PROGRESS},
        {id:SubNav_type.STUDY_SETTING, name:'设置',path:Router_type.ENV_SETTING},
        {id:SubNav_type.AD, name:'联系客服',path:Router_type.AD},
    ])

    return (
    <div className={`${css.subnav_wrap} h50`}>
        <ul>
            {
                navlist.map((item)=>{
                    return (
                        <li key={item.id}  className={`h50 lh50 ${selectedSubNavId===item.id?css.active:''}`}
                            onClick={()=>{
                                const id = item.id
                                dispatch.home.set_selectedSubNavId(id)
                                history.push({pathname:item.path})

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
