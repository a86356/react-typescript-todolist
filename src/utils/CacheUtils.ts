export const setCache=(key:string,value:string)=>{
    localStorage.setItem(key,value)
}
export const getCache =(key:string):any=>{
    return localStorage.getItem(key)
}

export const clearCache =(key:string):any=>{
    return localStorage.removeItem(key)
}

