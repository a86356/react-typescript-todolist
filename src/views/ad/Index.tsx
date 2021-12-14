import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

import ReactECharts from 'echarts-for-react';
import {isEmpty} from "@/utils/ValidateUtils";
import {getCache} from "@/utils/CacheUtils";
import {EXPIRED_TIME} from "@/const/const";

const Ad= () => {

    const book_id = 4;
    const [pwd,setPwd] = useState('');
    const dispatch = useDispatch<Dispatch>();
    const {list,totalCount,expired_time} = useSelector((state:RootState) => {
        const s = state.studyprogress
        let expiredTime=state.home.expiredTime

        if(isEmpty(expiredTime)){
            expiredTime  = getCache(EXPIRED_TIME)
        }

        return {
            list:s.list,
            totalCount:s.totalStudyCount,
            expired_time : expiredTime
        }
    });
    useEffect(()=>{
        dispatch.studyprogress.getstudyprogressinfoAsync(0)

    },[])



    const getOption=()=>{
        const xAxis:any=[];
        const yAxis_first:any=[];
        const yAxis_review:any=[];
        list.forEach(item=>{
            xAxis.push(item.day)
            yAxis_first.push(item.first)
            yAxis_review.push(item.review)
        })

        return {
            title: { text: `单词总学习进度`, left: 'center' },
            xAxis: {
                data: xAxis
            },
            yAxis: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 'left',
                data: ['学习新单词','复习单词']
            },
            series: [
                {
                    name:"学习新单词",
                    data: yAxis_first,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: { //数值样式
                                    color: 'black',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                },
                {
                    name: '复习单词',
                    data: yAxis_review,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: { //数值样式
                                    color: 'black',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                },
            ]
        };
    }



    return (
        <div className={`bodycontainer p20`} >
            {/*<p>购买英语听力,阅读,音标视频课程，适合零基础,小初高,大学四六级,成人学习</p>*/}
            {/*<p>其他福利:购买后会把您拉进独家英语学习群,群内有多位英语8级的名师在线解答英语问题</p>*/}
                        {/*<p>价格:365元,视频永久可看</p>*/}
            <p>购买网站vip,点我,</p>
            <p>微信公众号/淘宝店铺/抖音：简一英语</p>
            <p>客服微信:100000356</p>
            <p>账号到期时间:{expired_time}</p>
        </div>
    );
};

export default Ad
