import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewsList from "@/views/newlist/components/newslist";
import './index.less'
import Header from "@/views/login/components/Header";
import Body from "@/views/login/components/Body";
const Index = () => {


  return (
    <div className="container">
      <Header/>
      <Body/>
    </div>
  );
};

export default Index;
