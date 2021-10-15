export const isPhone=(phone:string)=>{
    const myreg = /^1[0-9]{10}$/;
    return myreg.test(phone);
}

export const isEmpty=(val:string)=>{
    return val === '' || val === undefined || val === null;

}