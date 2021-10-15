import apis from "@/api/apis";
import ActionType from "@/store/book/actionType";

export const getNowStudyBookAsync=()=>{
    return (dispatch:any)=>{
        apis.post('dancife/getnowstudybook',{}).then((res:any)=>{
            if(res){
                const data =res.data;
                const list=data['list']
                if(list.length>0){
                    const item = list[0]
                    dispatch({
                        type:ActionType.ACTION_BOOK_SET_NOW_BOOKID,
                        payload:item.id
                    })
                    dispatch({
                        type:ActionType.ACTION_BOOK_SET_NOW_TITLE,
                        payload:item.book_name
                    })
                    dispatch({
                        type:ActionType.ACTION_BOOK_SET_NOW_PIC,
                        payload:item.pic
                    })
                    dispatch({
                        type:ActionType.ACTION_BOOK_SET_NOWTOTALCOUNT,
                        payload:item.count
                    })
                }
            }
            dispatch({
                type:ActionType.ACTION_BOOK_SET_ISLOADINGNOWSTUDYBOOK,
                payload:true
            })
            dispatch({
                type:ActionType.ACTION_BOOK_SET_ISLOADEDNOWSTUDYBOOK,
                payload:true
            })
        })
    }
}

interface QueryBook{
    pageNum:number,
    pageSize:number
}

export const getMyBookListAsync=(data:QueryBook)=>{
    return (dispatch:any)=>{
        dispatch({
            type:ActionType.ACTION_BOOK_SET_ISLOADINGSTUDYBOOKLIST,
            payload:true
        })
        dispatch({
            type:ActionType.ACTION_BOOK_SET_STUDYBOOkLISTPAGENUM,
            payload:data.pageNum
        })
        apis.post('dancife/getmybookslist',data).then((res:any)=>{
            if(res){
                const d =res.data;
                dispatch({
                    type:ActionType.ACTION_BOOK_SET_STUDYBOOkLISTCOUNT,
                    payload:d['count']
                })
                dispatch({
                    type:ActionType.ACTION_BOOK_SET_STUDYBOOKLIST,
                    payload:d['list']
                })
            }
            dispatch({
                type:ActionType.ACTION_BOOK_SET_ISLOADINGSTUDYBOOKLIST,
                payload:false
            })

            dispatch({
                type:ActionType.ACTION_BOOK_SET_ISLOADEDSTUDYBOOKLIST,
                payload:true
            })
        })
    }
}
