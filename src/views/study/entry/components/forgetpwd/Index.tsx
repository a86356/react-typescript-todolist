import React, {useState} from "react";
import { Form, Input, Button, Modal ,message } from 'antd';
import './index.less'
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@/store";
import {ActionType} from "@/store/home/home";
import {isEmpty, isPhone} from "@/utils/ValidateUtils";
import SendCodeText from "@/components/sendCodeText/Index";
import {fotgetpwdAsync, registerAsync} from "@/store/home/HomeApi";
import Formlogo from "@/components/formlogo/Index";
const ForgetPwd = () => {
    const {showForm,loading} = useSelector((state:IRootState) => {
        const s = state.home
        return {
            showForm:s.isShowForgetpwdForm,
            loading:s.isShowForgetpwdLoading
        }
    });

    const [phone,setPhone]= useState('')
    const dispatch = useDispatch();


    const [form] = Form.useForm();
    return (
        <Modal title="忘记密码"
               visible={showForm}   onCancel={()=>{
            dispatch({
                type: ActionType.HomeToggleForgetpwdForm,
                payload: false,
            });
        }}
               footer={[
                   <Button key="login"  type="link" onClick={()=>{
                       dispatch({
                           type: ActionType.HomeToggleLoginForm,
                           payload: true,
                       });
                       dispatch({
                           type: ActionType.HomeToggleForgetpwdForm,
                           payload: false,
                       });
                       dispatch({
                           type: ActionType.HomeToggleRegisterForm,
                           payload: false,
                       });
                   }}>
                       去登陆
                   </Button>,
                   <Button key="login"  type="link" onClick={()=>{
                       dispatch({
                           type: ActionType.HomeToggleLoginForm,
                           payload: false,
                       });
                       dispatch({
                           type: ActionType.HomeToggleForgetpwdForm,
                           payload: false,
                       });
                       dispatch({
                           type: ActionType.HomeToggleRegisterForm,
                           payload: true,
                       });
                   }}>
                       去注册
                   </Button>,
                   <Button key="submit" type="primary" loading={loading}
                           onClick={()=>{
                               const formdata= form.getFieldsValue()
                               if(isEmpty(formdata.phone)){
                                   message.error("手机号为空");
                                   return
                               }
                               if(isEmpty(formdata.password)){
                                   message.error("密码为空");
                                   return
                               }
                               if(!isPhone(formdata.phone)){
                                   message.error("手机号码格式错误");
                                   return
                               }
                               if(isEmpty(formdata.code)){
                                   message.error("验证码为空");
                                   return
                               }
                               if(formdata.password!=formdata.password_again){
                                   message.error("两次输入的密码不一样");
                                   return
                               }
                               dispatch(fotgetpwdAsync(formdata))
                           }}
                   >
                       确认
                   </Button>
               ]}
        >
            <Formlogo/>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                preserve={false}
                form={form}
            >
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input onChange={(e)=>{
                        setPhone(e.target.value)
                    }} />
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="code"
                    rules={[{ required: true, message: '请输入验证码' }]}
                >
                    <Input
                        suffix={
                            <SendCodeText phone={phone}/>
                        }
                    />

                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="再次输入密码"
                    name="password_again"
                    rules={[{ required: true, message: '请再次输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ForgetPwd;
