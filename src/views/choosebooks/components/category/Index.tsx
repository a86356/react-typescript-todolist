import React, {useEffect} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

const CategoryList= () => {
    const {oneList,twoList,oneId,twoId,pageNum,pageSize} = useSelector((state:RootState) => {
        const s = state.choosebook
        return {
            oneList:s.oneList,
            twoList:s.twoList,
            oneId:s.oneId,
            twoId:s.twoId,
            pageNum:s.pageNum,
            pageSize:s.pageSize,
        }
    });
    const dispatch = useDispatch<Dispatch>();
    useEffect(()=>{
        dispatch.choosebook.getAllCategoryAsync(-1)
    },[])

    // useEffect(()=>{
    //     if(categoryId===0){return}
    //     dispatch.choosebook.getBookListAsync({
    //         pageNum:1,
    //         pageSize:pageSize,
    //         category_id:categoryId
    //     })
    // },[categoryId])

    return (
        <div className={`${css.choosebook_category_left_wrap}`}>
            <ul className={`${css.choosebook_category_left} ${css.onelist}`}>
                {
                    oneList.map((item:any)=>{
                        return (
                            <li key={item.id} className={`${item.id==oneId?css.active:''}`}
                                onClick={(e)=>{
                                    if(oneId==item.id){
                                        return
                                    }
                                    dispatch.choosebook.select_one(item.id)
                                }}
                            >{item.level}</li>
                        )
                    })
                }
            </ul>
            <ul className={`${css.choosebook_category_left} ${css.twolist}`}>
                {
                    twoList.map((item:any)=>{
                        return (
                            <li key={item.id} className={`${item.id==twoId?css.active:''}`}
                                onClick={(e)=>{
                                    if(twoId==item.id){
                                        return
                                    }
                                    dispatch.choosebook.select_two(item.id)

                                }}
                            >{item.book_name}</li>
                        )
                    })
                }
            </ul>
        </div>
  );
};

export default CategoryList;
