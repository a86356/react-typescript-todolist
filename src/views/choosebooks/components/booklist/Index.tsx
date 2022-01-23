import React, {useEffect, useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import BookPic from "@/components/bookpic/Index";
import MyPagination from "@/components/pagination/Index";
import MyEmpty from "@/components/empty/Index";
import {message, Modal} from 'antd';
import {useHistory} from "react-router-dom";
import {SHOPNAME, TINGXIE_VIP} from "@/const/const";
import {Dispatch, RootState} from "@/rematch";
import {Auth_type} from '@/const/const'
import {getCache} from "@/utils/CacheUtils";

const BookList= () => {
    const {oneId,twoId,pageSize,searchInputValue,pageNum,threeList,count,categoryId,loading,loaded} = useSelector((state:RootState) => {
        const s = state.choosebook
        return {
            oneId:s.oneId,
            twoId:s.twoId,
            threeList:s.threeList,
            count:s.count,
            categoryId:s.categoryId,
            pageNum:s.pageNum,
            loading:s.isSearchLoading,
            searchInputValue:s.searchInputValue,
            pageSize:s.pageSize,
            loaded:s.isSearchLoaded
        }
    });
    const dispatch = useDispatch<Dispatch>();
    const [isModalVisible,setIsModalVisible] = useState<boolean>(false)
    const history = useHistory()

    useEffect(()=>{

        dispatch.choosebook.set_pageNum(1)
    },[oneId,twoId])

    return (
        <div className={`ml70 ${css.right}`}>
            <ul className={`${css.list} ${loading?'hide':''}`}>
                {
                    threeList.map((item:any)=>{
                        return (
                            <li className={`${css.li}`} key={item.id} onClick={()=>{


                                //已经在单词书中
                                const tx_vip= getCache(TINGXIE_VIP);
                                if(tx_vip!='1'){
                                    setIsModalVisible(true);
                                    return
                                }
                                history.push({ pathname: "/tcdetail/"+item.id, state: { article_id: item.id } });
                                //添加到我的单词书中
                                // dispatch.choosebook.addMyBookAsync({book_id:item.id,callback:function (){
                                //     message.success('添加成功')
                                //     setTimeout(()=>{
                                //         console.log('navvvv')
                                //         //history.push({ pathname: "/detail", state: { e_word: 'state',c_word:'国家，政权' } });
                                //     },1000)
                                // }})
                            }}>

                                <div className={`${css.title} fz16 lh24  tc1`}>
                                    {item.subfix}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <MyEmpty isShow={(loaded && threeList.length===0)}/>

            <Modal title="成为简一听抄会员"
                   cancelText={'取消'}
                   visible={isModalVisible} onOk={()=>{
                setIsModalVisible(false)
            }} onCancel={()=>{
                setIsModalVisible(false)
            }}>
                <p>{Auth_type.NO_PAY_TC}</p>
            </Modal>

            <div className={`${css.pagewrap}`}>
                <MyPagination pageSize={pageSize} currentPage={pageNum} total={count} callback={(page:number)=>{
                    dispatch.choosebook.getBookListAsync({
                        pageNum:page,
                        pageSize:10,
                    })
                }}/>
            </div>
        </div>
  );
};

export default BookList;
