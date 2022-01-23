export const create_duration=(value:string,type:string)=>{

    // type 1   10:00
    if(type=='1'){
        let secondTime = parseInt(value); // 秒
        let minuteTime = 0; // 分
        let hourTime = 0; // 小时
        if (secondTime >= 60) {
            minuteTime = parseInt((secondTime / 60).toString());
            secondTime = parseInt((secondTime % 60).toString());
            if (minuteTime >= 60) {
                hourTime = parseInt((minuteTime / 60).toString());
                minuteTime = parseInt((minuteTime % 60).toString());
            }
        }
        const result ="" +(parseInt(secondTime.toString()) < 10? "0" + parseInt(secondTime.toString()): parseInt(secondTime.toString()));

        let m='',s=''
        //分
        if(parseInt(minuteTime.toString())<10){
            m='0'+minuteTime
        }
        if(parseInt(minuteTime.toString())>10){
            m = minuteTime.toString()
        }
        if(parseInt(minuteTime.toString())==0){
            m='00'
        }
        //秒
        if(parseInt(secondTime.toString())<10){
            s='0'+secondTime
        }
        if(parseInt(secondTime.toString())>=10){
            s = secondTime.toString()
        }
        if(parseInt(secondTime.toString())==0){
            s = '00'
        }

        return  m+":"+s
    }
    return  ''

}