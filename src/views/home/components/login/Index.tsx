import React from "react";
import {Button, Form, Input, message, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, isPhone} from "@/utils/ValidateUtils";
import Formlogo from "@/components/formlogo/Index";
import {Dispatch, RootState} from "@/rematch";

const Login = () => {
    const {isShowLoginForm,isShowLoginLoading} = useSelector((state:RootState) => {
        const s = state.home
        return {
            isShowLoginForm:s.isShowLoginForm,
            isShowLoginLoading:s.isShowLoginLoading
        }
    });
    const dispatch = useDispatch<Dispatch>();

    const [form] = Form.useForm();
    return (
      <Modal title="登陆"
             visible={isShowLoginForm}  onCancel={()=>{
           dispatch.home.set_isShowLoginForm(false)
      }}
             footer={[
                 <Button type='link' danger key="forgetpassword" onClick={()=>{

                     dispatch.home.set_isShowLoginForm(false)
                     dispatch.home.set_isShowRegisterForm(false)
                     dispatch.home.set_isShowForgetpwdForm(true)
                 }}>
                     忘记密码
                 </Button>,
                 <Button type='link' key="back" onClick={()=>{
                     dispatch.home.set_isShowLoginForm(false)
                     dispatch.home.set_isShowRegisterForm(true)
                     dispatch.home.set_isShowForgetpwdForm(false)
                 }}>
                     去注册
                 </Button>,
                 <Button key="submit" type="primary" loading={isShowLoginLoading}
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
                             dispatch.home.loginAsync(formdata)
                         }}
                 >
                     登陆
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
                  <Input />
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

export default Login;
