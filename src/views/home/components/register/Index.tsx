import React, {useState} from "react";
import {Button, Form, Input, message, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, isPhone} from "@/utils/ValidateUtils";
import SendCodeText from "@/components/sendCodeText/Index";
import Formlogo from "@/components/formlogo/Index";
import {Dispatch, RootState} from "@/rematch";

const Register = () => {
    const {isShowRegisterForm,loading} = useSelector((state:RootState) => {
        const s = state.home
        return {
            isShowRegisterForm:s.isShowRegisterForm,
            loading:s.isShowRegisterLoading
        }
    });

    const [phone,setPhone]= useState('')
    const dispatch = useDispatch<Dispatch>();


    const [form] = Form.useForm();
    return (
      <Modal title="注册"
             visible={isShowRegisterForm}   onCancel={()=>{

          dispatch.home.set_isShowRegisterForm(false)
      }}
             footer={[
                 <Button key="login"  type="link" onClick={()=>{

                     dispatch.home.set_isShowLoginForm(true)
                     dispatch.home.set_isShowRegisterForm(false)

                 }}>
                     去登陆
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
                             dispatch.home.registerAsync(formdata)
                         }}
                 >
                     注册
                 </Button>
             ]}
      >
          <Formlogo/>
          <Form
              name="basic"
              labelCol={{ span: 4 }}
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
          </Form>
      </Modal>
  )
}

export default Register;
