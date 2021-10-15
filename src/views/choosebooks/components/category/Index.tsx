import React, {useEffect} from "react";
import css from './index.module.less'
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "@/rematch";

const CategoryList= () => {
    const {cateList,categoryId,pageSize} = useSelector((state:RootState) => {
        const s = state.choosebook
        return {
            cateList:s.cateList,
            pageNum:s.pageNum,
            categoryId:s.categoryId,
            pageSize:s.pageSize,
        }
    });
    const dispatch = useDispatch<Dispatch>();

    useEffect(()=>{
        dispatch.choosebook.getAllCategoryAsync(-1)
    })

    useEffect(()=>{
        if(categoryId===0){return}
        dispatch.choosebook.getBookListAsync({
            pageNum:1,
            pageSize:pageSize,
            category_id:categoryId
        })
    },[categoryId])

    return (
        <div className={`${css.choosebook_category_left}`}>
            <ul>
                {
                    cateList.map((item:any)=>{
                        return (
                            <li key={item.id} className={`${item.id==categoryId?css.active:''}`}
                                onClick={(e)=>{
                                    if(categoryId==item.id){
                                        return
                                    }

                                    dispatch.choosebook.getBookListAsync({
                                        pageNum:1,
                                        pageSize:10,
                                        category_id:item.id
                                    })
                                }}
                            >{item.category_name}</li>
                        )
                    })
                }
            </ul>
        </div>
  );
};

export default CategoryList;
