import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import NewsList from "@/views/newlist/components/newslist";
import './index.less'

const Index = () => {


  return (
    <div className="container-wrap">
        <Searchbar/>
        <NewsList/>
    </div>
  );
};

export default Index;
