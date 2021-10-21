import React from "react";
import css from './index.module.less'
import {Input, Popover, Tag, Tooltip} from 'antd';

import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {CheckCircleOutlined, CloseCircleOutlined,} from '@ant-design/icons';
import {getDefaultPlayPhontic} from "@/utils/CommonUtils";
import {isEmpty} from "@/utils/ValidateUtils";
import {IWordItem} from '@/rematch/models/study'

interface D{
    book_id:number,
    study_type:number
}

const BatchList= (props:D) => {
    const {book_id,study_type} = props
    const dispatch = useDispatch<Dispatch>();
    const {isLoading,pageSize,pageNum,todayStudyCurrentIndex,current,todayStudyList,todayStudyCount} = useSelector((state:RootState) => {
        const s = state.study
        return {
            todayStudyList:s.todayStudyList,
            todayStudyCount:s.todayStudyCount,
            current:s.todayStudyCurrent,
            todayStudyCurrentIndex:s.todayStudyCurrentIndex,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
            isLoading:s.isLoading
        }
    });

    const play = (e_word:string)=>{
        if(!isEmpty(e_word)){
            const str1 = `https://dict.youdao.com/dictvoice?audio=${e_word}&type=${getDefaultPlayPhontic()=='en'?2:1}`
            const audio = new Audio(str1);
            setTimeout(()=>{
                audio.play();
            },100)
        }
    }

    return (
        <div className={`${css.right}`}>
            {
                todayStudyList.map((item)=>{
                    return (
                        <div key={item.id} className={`${css.batch_item}`}>
                            <div >

                                <div className={`${css.right_t}`}>
                                    <div>
                                        <Tooltip placement="top" title={`点击即可收藏该单词`}>
                                            <i style={{cursor:"pointer"}} className={`iconfont mr10 ${item.is_collected==1?css.red:''}`} onClick={()=>{
                                                const n = item.is_collected==1?0:1
                                                dispatch.study.updateuserwordcollected({
                                                    book_id:book_id,
                                                    e_word:item.e_word,
                                                    is_collected:n
                                                })
                                                const l = [...todayStudyList]
                                                l.forEach(item4=>{
                                                    if(item4.e_word==item.e_word){
                                                        item4.is_collected = n
                                                    }
                                                })
                                                dispatch.study.set_todayStudyList(l)
                                            }}>&#xe612;</i>
                                        </Tooltip>

                                        <Tooltip placement="top" title={`移入再发音一次`}>
                                            <i style={{cursor:"pointer"}} className={`iconfont mr10`} onMouseOver={()=>{
                                                play(item.e_word)
                                            }}>&#xe650;</i>
                                        </Tooltip>

                                        <Popover content={(<div>
                                            <p style={{fontSize:'20px'}}>{item.e_word}</p>
                                            <p>
                                                <a href={`https://dict.youdao.com/search?q=${item.e_word}&keyfrom=new-fanyi.smartResult`} target={'_blank'} className={'mr10'}>有道</a>
                                                <a href={`https://fanyi.baidu.com/translate?aldtype=16047&query=${item.e_word}&keyfrom=baidu&smartresult=dict&lang=auto2zh`} target={`_blank`} className={'mr10'}>百度</a>
                                                <a href={`http://www.iciba.com/word?w=${item.e_word}`} target={`_blank`}>金山词霸</a>
                                            </p>
                                            {
                                                item.c_word_list.map(item3=>{
                                                    return (
                                                        <p style={{fontSize:'20px'}} key={item3.value}>{item3.value}</p>
                                                    )
                                                })
                                            }
                                        </div>)} title="单词(按键盘的tab健可以切换单词)">
                                            <i style={{cursor:"pointer"}} className={`iconfont`} >&#xe655;</i>
                                        </Popover>
                                    </div>

                                    <div className="tag ml10">
                                        <Tag className={`${item.is_test_right==1?'':'hide'}`} icon={<CheckCircleOutlined />} color="success">
                                            正确
                                        </Tag>
                                        <Tag className={`${item.is_test_right==2?'':'hide'}`}  icon={<CloseCircleOutlined />} color="error">
                                            错误
                                        </Tag>
                                    </div>

                                </div>
                                <div className="b">

                                    <Input
                                        className={`${item.is_now_test_right==1?'green':''} ${item.is_now_test_right==2?'red':''}`}
                                        placeholder={`请输入单词 编号:${item.num_id}`}
                                        onChange={(e)=>{
                                            const v = e.target.value
                                            const len = v.length;
                                            const now_string = item.e_word.substring(0,len);
                                            let flag = 0;
                                            if(now_string==v){
                                                flag = 1
                                            }
                                            const l = [...todayStudyList]
                                            l.forEach(item4=>{
                                                //当前的单词和循环的单词相等的时候
                                                if(item.e_word==item4.e_word){
                                                    //半对的
                                                    item4.is_test_right = 0
                                                    if(v==now_string){
                                                        item4.is_now_test_right = 1
                                                    }else{
                                                        item4.is_now_test_right = 2
                                                    }

                                                    //当长度相等的时候判断
                                                    if(item4.e_word.length==len && len>0){
                                                        if(item4.e_word==v){
                                                            item4.is_test_right = 1
                                                        }else{
                                                            item4.is_test_right = 2
                                                        }
                                                    }
                                                }
                                            })
                                            dispatch.study.set_todayStudyList(l)

                                        }}
                                        onFocus={()=>{
                                            play(item.e_word)
                                        }}
                                        onBlur={()=>{
                                            //console.log(item.e_word)
                                            if(item.is_test_right!=0){
                                                dispatch.study.updatestudyprogress({
                                                    book_id:book_id,
                                                    result:item.is_test_right==1?1:2,
                                                    e_word:item.e_word,
                                                    study_type:study_type
                                                })
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
}

export default BatchList;
