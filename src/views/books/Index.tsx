import React from "react";
import css from './index.module.less'
import NowBook from "@/views/books/components/nowbook/Index";
import MyBookList from "@/views/books/components/mybooklist/Index";

const Books= () => {
    return (
    <div className={`bodycontainer ${css.book} p20`} >
        <NowBook/>
        <MyBookList/>
    </div>

  );
};

export default Books;
