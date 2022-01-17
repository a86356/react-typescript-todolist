import React, {useEffect, useState} from "react";
import './index.module.less'
import css from "@/views/setting/index.module.less";
import {Form, Input, Button, Radio, Upload,message} from 'antd';
import {useDispatch} from "react-redux";
import {Dispatch} from "@/rematch";
import {getCache} from "@/utils/CacheUtils";
import {DEFAULT_YB, TOKEN} from "@/const/const";
import {UploadOutlined} from "@ant-design/icons";

const Setting = () => {

  const dispatch = useDispatch<Dispatch>();
  const [token,setToken] = useState(getCache(TOKEN));


    const props = {
        action: 'https://www.weixin1234.top/index.php/danci/dealmpthree',

    };

  useEffect(()=>{


  },[])

    const changemp3=(file:any)=>{

        const myfile = file.file
        if(myfile.status=='done'){
            const resp =myfile.response
            if(resp.code!=0){
                message.error(resp.msg)
                return
            }
            message.success('上传成功,请接着上传文本文件')
        }

    }


    function beforeUploadmp3(file:any) {

        const isJpgOrPng = file.type === 'audio/mpeg' ;
        if (!isJpgOrPng) {
            message.error('只能上传mp3类型的文件');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('文件大小不能超过5MB');
        }
        return isJpgOrPng && isLt2M;
    }


  return (
    <div className={`bodycontainer ${css.setting_wrap}`}>
        <div className={`${css.form}`}>
            <div className={`${css.form_item}`}>
                <div className={`${css.left}`}>上传自己的音频</div>
                <div>必须先传mp3,再传txt.且mp3和txt的文件名必须一致，如abc.mp3和abc.txt</div>
                <div>
                    <Upload
                        maxCount={1}
                        beforeUpload={beforeUploadmp3}
                        action={'https://www.weixin1234.top/index.php/dancife/dealmpthree?token='+token}
                        onChange={changemp3}
                    >
                        <Button icon={<UploadOutlined />}>上传mp3</Button>
                    </Upload>
                </div>
                <div>
                    <Upload
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>上传txt</Button>
                    </Upload>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Setting;
