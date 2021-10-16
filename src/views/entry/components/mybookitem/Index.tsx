import React, {useState} from "react";
import css from './index.module.less'
import ProgressBar from "@/components/progressbar/Index";
import BookPic from "@/components/bookpic/Index";
import {Modal} from 'antd'
import {useDispatch} from "react-redux";
import {Dispatch} from "@/rematch";

interface D{
    id:string;
    book_name:string,
    total:number;
    hasfinished:number;
    pic:string
}


const MyBookItem= (props:D) => {
  const  {id,book_name,total,hasfinished,pic} =  props

  const [isShowModal,setIsShowModal] = useState(false)
    const dispatch = useDispatch<Dispatch>();

    return (
      <div className={`${css.item} p20`}>
          <div className={`${css.l}`}>
              <BookPic bookName={book_name} pic={pic}/>
          </div>
          <div className={`${css.right} ml20`}>
              <div className={`${css.t}`}>
                  <div className={`${css.title} lh30 mb10`}>
                      <h2 className={'fz20'}>{book_name}</h2>
                  </div>
                  <div className={`${css.finished}  lh30 tc2`}>
                      已完成：{hasfinished}/{total}词
                  </div>
                  <div className={`${css.progressbarwrap}`}>
                      <ProgressBar total={total} hasfinished={hasfinished}/>
                  </div>
              </div>
              <Modal
                  title="刪除"
                  visible={isShowModal}
                  onOk={()=>{
                      dispatch.book.deletemybook({book_id:id})
                  }}
                  onCancel={()=>{
                      setIsShowModal(false)
                  }}
                  okText="确认"
                  cancelText="取消"
              >
                  <p>删除会把此书的学习记录全部删除,您确定要删除吗？</p>
              </Modal>

              <div className={`${css.bottom}`}>
                  <i className="iconfont fz30" onClick={()=>{
                    setIsShowModal(true)
                  }}>
                      &#xeb83;
                  </i>
                  <div className={`${css.study} fz14 mt15`}>
                      <span>学习此书</span>
                      <i className={'iconfont'}>&#xe68c;</i>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MyBookItem;
