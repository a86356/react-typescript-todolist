import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {Button, message, Modal} from "antd";
import Loading from "@/components/loading/Index";

const Selector= () => {
    const {isLoading,planStudyNum,total,nowBookId} = useSelector((state:RootState) => {
        const s = state.bookmissionsetting
        return {
            planStudyNum:s.planStudyNum,
            total:s.nowTotalCount,
            nowBookId:s.nowBookId,
            isLoading:s.isLoading
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
    const [isShow,setIsShow] = useState<boolean>(false)

    return (
        <>
            <Loading isLoading={isLoading}/>
            <Modal title="注意" visible={isShow} onOk={()=>{
                dispatch.bookmissionsetting.finishdaystudynumberAsync({
                    book_id:nowBookId,
                    day_study_number:10
                })
                setIsShow(false)

                message.info("设置时间较长,请等待...")
            }} onCancel={()=>{
                setIsShow(false)
            }}>
                <p style={{color:'red',fontWeight:'bold',fontSize:'20px'}}>重新设置每日背词数量会清除该本单词书的所有学习记录,请知悉(第一次设置请忽略)</p>
            </Modal>
            <div className={`${css.daystudy}`}>

                <Button style={{marginLeft:'20px'}} type={'primary'} onClick={()=>{
                  setIsShow(true)
                }}>添加单词</Button>
            </div>
            {/*<div className={`${css.itemwrap}`} >*/}
            {/*    /!*{*!/*/}
            {/*    /!*    daynewwordslist.map(item=>{*!/*/}
            {/*    /!*        return (*!/*/}
            {/*    /!*            <div className={`${css.item} ${planStudyNum==item.number?css.active:""}`} key={item.number}*!/*/}
            {/*    /!*                onClick={()=>{*!/*/}
            {/*    /!*                    if(planStudyNum==item.number){return}*!/*/}
            {/*    /!*                    dispatch.bookmissionsetting.set_planStudyNum(item.number)*!/*/}
            {/*    /!*                    // dispatch.bookmissionsetting.getStudySchedule({*!/*/}
            {/*    /!*                    //     book_id:nowBookId,*!/*/}
            {/*    /!*                    //     plan_study_day:Math.ceil(total/item.number)*!/*/}
            {/*    /!*                    // })*!/*/}
            {/*    /!*                }}*!/*/}
            {/*    /!*            >*!/*/}
            {/*    /!*                每天学习{item.number}个新单词*!/*/}
            {/*    /!*            </div>*!/*/}
            {/*    /!*        )*!/*/}
            {/*    /!*    })*!/*/}
            {/*    /!*}*!/*/}
            {/*</div>*/}

        </>
  );
};

export default Selector;
