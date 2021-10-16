import React, {useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {Router_type, SubNav_type} from "@/const/const";
import { useHistory } from "react-router-dom";
import {RadiusUpleftOutlined} from "@ant-design/icons";


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
        {id:SubNav_type.WORD_STUDY, name:'单词学习'},
        {id:SubNav_type.WORD_BOOK_SELECT, name:'单词书选择'},
        {id:SubNav_type.STUDY_PROGRESS, name:'学习进度'},
        {id:SubNav_type.STUDY_SETTING, name:'设置'},
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
                                //设置
                                if(id==SubNav_type.STUDY_SETTING){
                                    history.push({pathname:Router_type.ENV_SETTING})
                                }
                                //学习进度
                                if(id==SubNav_type.STUDY_PROGRESS){
                                    history.push({pathname:Router_type.STUDY_PROGRESS})
                                }
                                //单词书的选择
                                if(id==SubNav_type.WORD_BOOK_SELECT){
                                    history.push({pathname:Router_type.CHOOSE_BOOK})
                                }
                                //广告

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
