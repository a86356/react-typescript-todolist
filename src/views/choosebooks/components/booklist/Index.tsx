import React, {useState} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import BookPic from "@/components/bookpic/Index";
import MyPagination from "@/components/pagination/Index";
import MyEmpty from "@/components/empty/Index";
import {message, Modal} from 'antd';
import {useHistory} from "react-router-dom";
import {SHOPNAME} from "@/const/const";
import {Dispatch, RootState} from "@/rematch";

const BookList= () => {
    const {pageSize,searchInputValue,pageNum,bookList,count,categoryId,loading,loaded} = useSelector((state:RootState) => {
        const s = state.choosebook
        return {
            bookList:s.bookList,
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

    return (
        <div className={`ml70 ${css.right}`}>
            <ul className={`${css.list} ${loading?'hide':''}`}>
                {
                    bookList.map((item:any)=>{
                        return (
                            <li key={item.id} onClick={()=>{
                                if(item.is_pay===1){
                                    setIsModalVisible(true)
                                    return;
                                }
                                //已经在单词书中

                                //添加到我的单词书中
                                dispatch.choosebook.addMyBookAsync({book_id:item.id,callback:function (){
                                        message.success('添加成功')
                                        setTimeout(()=>{
                                            console.log('navvvv')
                                            //history.push({ pathname: "/detail", state: { e_word: 'state',c_word:'国家，政权' } });
                                        },1000)
                                    }})
                            }}>
                                <div className={`${css.pic}`}>
                                    <BookPic pic={item.pic} bookName={item.book_name}/>
                                </div>
                                <div className={`${css.title} fz16 lh24 mt10 mb10 tc1`}>
                                    {item.book_name}
                                </div>
                                <div className={`${css.total} tc2 fz14 ${item.count===0 || item.count===null?'hide':''}`}>
                                    共{item.count}词
                                </div>
                                <div className={`${css.vip} tac`}>
                                    {item.is_pay===1?'vip会员专享':'免费'}
                                    {/*<i className={`iconfont ${item.is_pay==1?'':'hide'}`}>&#xe62a;</i>*/}
                                    {/*<i className={`iconfont ${item.is_pay==1?'':'hide'}`}>&#xe653;</i>*/}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <MyEmpty isShow={(loaded && bookList.length===0)}/>

            <Modal title="成为vip会员"
                   cancelText={'取消'}
                   visible={isModalVisible} onOk={()=>{
                setIsModalVisible(false)
            }} onCancel={()=>{
                setIsModalVisible(false)
            }}>
                <p>淘宝搜索店铺:{SHOPNAME},购买vip会员</p>
            </Modal>

            <div className={`${css.pagewrap}`}>
                <MyPagination pageSize={pageSize} currentPage={pageNum} total={count} callback={(page:number)=>{
                    dispatch.choosebook.getBookListAsync({
                        pageNum:page,
                        pageSize:10,
                        category_id:categoryId,
                        book_name:searchInputValue
                    })
                }}/>
            </div>
        </div>
  );
};

export default BookList;
