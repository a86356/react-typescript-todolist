import React, {useState} from "react";
import css from './index.module.less'
import apis from "@/api/apis";
import {isPhone} from "@/utils/ValidateUtils";
import {message} from "antd";

interface Data{
    phone:string
}

const SendCodeText = (props:Data) => {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [time, setTime] = useState<number>(60);
  const phone = props.phone


  return (
    <div className={`${css.text}`} onClick={()=>{
        if(!isPhone(phone)){
            message.error('手机号格式错误')
            return;
        }

        if(isSendCode){
            return
        }
        setIsSendCode(true)
        const active = setInterval(() => {
            setTime((preSecond) => {
                if (preSecond <= 1) {
                    setIsSendCode(false)
                    clearInterval(active)
                    // 重置秒数
                    return 60
                }
                return preSecond - 1
            })
        }, 1000)


        //发送
        apis.senccode(phone)
    }}>
        {isSendCode?`${time}秒后重新发送` : '发送验证码'}
    </div>
  );
};

export default SendCodeText;
