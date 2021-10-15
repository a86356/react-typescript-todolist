import React, { } from "react";
import Header from "@/views/home/components/header/Index";
import Login from "@/views/home/components/login/Index";
import Register from "@/views/home/components/register/Index";
import ForgetPwd from "@/views/home/components/forgetpwd/Index";
import SubNav from "@/views/home/components/subnav/Index";
const Index = () => {
  return (
    <div className="container-wrap">
        <Header/>
        <Login/>
        <Register/>
        <ForgetPwd/>
        <SubNav/>
    </div>
  );
};

export default Index;
