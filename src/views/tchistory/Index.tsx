import React, {useEffect, useState} from "react";
import css from "@/views/tchistory/index.module.less";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";
import {useHistory, useParams} from "react-router-dom";
import {Table, Space, Pagination} from 'antd';

type  Param = {
    article_id:string,
}

const Tchistory = () => {
    const history = useHistory()

    const dispatch = useDispatch<Dispatch>();

    const {tc_history_list,tc_pageNum,tc_pageSize,tc_count} = useSelector((state:RootState) => {
        const s = state.study
        return {
            tc_history_list:s.tc_history_list,
            tc_pageNum:s.tc_pageNum,
            tc_pageSize:s.tc_pageSize,
            tc_count:s.tc_count,

        }
    });

    useEffect(()=>{
        dispatch.study.getuserarticllistAsync({pageNum:1,pageSize:tc_pageSize})
    },[])

    const changePage=(value:number)=>{
        dispatch.study.set_tc_pageNum(value)
        dispatch.study.getuserarticllistAsync({pageNum:value,pageSize:tc_pageSize})
    }


    const columns = [
        {
            title: '课本编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '课本名',
            dataIndex: 'book_name',
            key: 'book_name',
        },
        {
            title: '文章名',
            dataIndex: 'subfix',
            key: 'subfix',
        },
        {
            title: '操作',
            key: 'subfix',
            render: (text:any, record:any) => (
                <Space size="middle">
                    <a onClick={()=>{
                        history.push({ pathname: "/tcdetail/"+record.id, state: { article_id: record.id } });
                    }}>查看详情</a>
                </Space>
            ),
        },
    ];

    return (
        <div className={`${css.tc_history_wrap}`}>
            <h1 className={`${css.title}`}>听写记录</h1>
            <Table bordered
                   dataSource={tc_history_list}
                   columns={columns}
                   pagination={false}
            />
            <div className={`${css.pagewrap}`}>
                <Pagination
                    defaultCurrent={tc_pageNum}
                    total={tc_count}
                    hideOnSinglePage={false}
                    className="pagination"
                    pageSize={tc_pageSize}
                    onChange={(pagenum)=>{changePage(pagenum)}}
                />

            </div>

        </div>
    );
};

export default Tchistory;
