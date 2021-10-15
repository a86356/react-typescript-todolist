import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {Button} from "antd";

const Selector= () => {
    const {planStudyNum,total,nowBookId} = useSelector((state:RootState) => {
        const s = state.bookmissionsetting
        return {
            planStudyNum:s.planStudyNum,
            total:s.nowTotalCount,
            nowBookId:s.nowBookId
        }
    });
    const dispatch = useDispatch<Dispatch>();

    const [daynewwordslist] = useState(()=>{
        const list=[];
        for (let i=1;i<=20;i++){
            list.push({number:i*10,id:i});
        }
        return list
    })

    return (
        <>
            <div className={`${css.daystudy}`}>
                每日学习的单词数量
                <Button style={{marginLeft:'20px'}} type={'primary'} onClick={()=>{
                    dispatch.bookmissionsetting.finishdaystudynumberAsync({
                        book_id:nowBookId,
                        day_study_number:planStudyNum
                    })
                }}>完成设置</Button>
            </div>
            <div className={`${css.itemwrap}`} >
                {
                    daynewwordslist.map(item=>{
                        return (
                            <div className={`${css.item} ${planStudyNum==item.number?css.active:""}`} key={item.number}
                                onClick={()=>{
                                    if(planStudyNum==item.number){return}
                                    dispatch.bookmissionsetting.set_planStudyNum(item.number)
                                    dispatch.bookmissionsetting.getStudySchedule({
                                        book_id:nowBookId,
                                        plan_study_day:Math.ceil(total/item.number)
                                    })
                                }}
                            >
                                每天学习{item.number}个新单词
                            </div>
                        )
                    })
                }
            </div>

        </>
  );
};

export default Selector;
