import apis from "@/api/apis";
import ActionType from "@/store/choosebook/actionType";

export const getAllCategoryAsync=(data?:any)=>{
    return (dispatch:any)=>{

        apis.post('dancife/getallcategory',data).then((res:any)=>{
            if(res){
                const data =res.data;
                const category_id = data['list'][0].id

                dispatch({
                    type:ActionType.ACTION_SET_CATEGORLIST,
                    payload:data
                })
                dispatch({
                    type:ActionType.ACTION_SET_CATEGORY_ID,
                    payload:category_id
                })
            }
        })
    }
}

interface QueryBook{
    book_id?:number,
    book_name?:string,
    pageNum:number,
    category_id?:number,
    pageSize:number
}

export const getBookListAsync=(data:QueryBook)=>{
    return (dispatch:any)=>{
        dispatch({
            type:ActionType.ACTION_SET_SEARCHLOADING,
            payload:true
        })
        dispatch({
            type:ActionType.ACTION_SET_PAGENUM,
            payload:data.pageNum
        })

        if(data.category_id){
            dispatch({
                type:ActionType.ACTION_SET_CATEGORY_ID,
                payload:data.category_id
            })
        }

        apis.post('dancife/getbooklist',data).then((res:any)=>{
            if(res){
                const d =res.data;
                dispatch({
                    type:ActionType.ACTION_SET_BOOKLIST,
                    payload:d['list']
                })
                dispatch({
                    type:ActionType.ACTION_SET_COUNT,
                    payload:d['count']
                })
            }
            dispatch({
                type:ActionType.ACTION_SET_SEARCHLOADING,
                payload:false
            })
        })
    }
}
interface IAddBook {
    book_id:number;
    callback?:any
}

export const addMyBookAsync=(data:IAddBook)=>{
    return (dispatch:any)=>{
        apis.post('dancife/addmybook',{book_id:data.book_id}).then((res:any)=>{
            if(res){
                const d =res.data;
                if(data.callback){
                    data.callback();
                }
            }
        })
    }
}

