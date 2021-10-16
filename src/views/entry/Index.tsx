import React from "react";
import css from './index.module.less'
import NowBook from "@/views/entry/components/nowbook/Index";
import MyBookList from "@/views/entry/components/mybooklist/Index";

const Entry= () => {
    return (
    <div className={`bodycontainer ${css.book} p20`} >
        <NowBook/>
        <MyBookList/>
    </div>

  );
};

export default Entry;
